import { act, useContext } from 'react'
import { useState, useEffect, useRef } from 'react';
import { getSelectedSlots, getItemSlots, findItemBySlot, canPlaceItem } from '../utils/inventory';
import MouseContext from '../contexts/MouseContext';
import UpgradeContext from '../contexts/UpgradeContext';
import { playSound, dropSounds } from '../utils/audio'

const useInventoryDrag = ({ items, setItems, activeTab, inventorySize, handleHoverSlot }) => {

    const [draggedItemId, setDraggedItemId] = useState(null);
    const targetItem = useRef(null);
    const draggedItem = items.find(
        item => item.instanceId === draggedItemId
    ) ?? null;

    const slotsPreview = useRef({ slots: [], status: 'valid' });
    const startPos = useRef({ x: 0, y: 0 });
    const moveMode = useRef(null);
    const itemOriginSlots = useRef([]);
    const { handleStartUpgrade, itemToUpgrade } = useContext(UpgradeContext);

    const mousePosition = useContext(MouseContext);

    const handleClickSlot = (e) => {

        if (draggedItem) {
            handleDropItem(e);
            return;
        }

        playSound('drag_item');
        const slotIndex = Number(e.currentTarget.id.split('-')[1]);
        const itemInSlot = findItemBySlot(items, activeTab, slotIndex, inventorySize);

        if (itemInSlot) {
            setDraggedItemId(itemInSlot.instanceId)
            startPos.current = { x: e.clientX, y: e.clientY };
            itemOriginSlots.current = getItemSlots(itemInSlot, inventorySize);

            let slots = getSelectedSlots(slotIndex, itemInSlot.item.size, inventorySize)

            const status = 'valid'

            slotsPreview.current = ({ slots: getSelectedSlots(slotIndex, itemInSlot.item.size, inventorySize), status });
        }

    }

    const dropConfig = {
        "blessing scroll": {
            canInteract: (item) => item.next_item_id != null,
            onInteract: (item) => handleStartUpgrade(item, 'blessing_scroll')
        },
        "dragon scroll": {
            canInteract: (item) => item.next_item_id != null,
            onInteract: (item) => handleStartUpgrade(item, 'dragon_scroll')
        },
        "blacksmith handbook": {
            canInteract: (item) => item.next_item_id != null,
            onInteract: (item) => handleStartUpgrade(item, 'blacksmith_handbook')
        },
        "magic stone": {
            canInteract: (item) => item.next_item_id != null,
            onInteract: (item) => handleStartUpgrade(item, 'magic_stone')
        },
        "scroll of war": {
            canInteract: (item) => item.next_item_id != null && item.plus < 3,
            onInteract: (item) => handleStartUpgrade(item, 'scroll_of_war')
        }

    }

    const resetDrag = () => {
        slotsPreview.current = ({ slots: [], stauts: 'valid' });
        setDraggedItemId(null);
        moveMode.current = null;
        itemOriginSlots.current = [];
        targetItem.current = null;
    }

    const dropOnSlot = () => {

        if (itemToUpgrade) {
            resetDrag();
            return;
        }

        const slotIndex = slotsPreview.current.slots[0];
        const itemInSlot = findItemBySlot(items, activeTab, slotIndex, inventorySize);
        let canInteract = false;

        if (itemInSlot && dropConfig[draggedItem.item.name]) {

            canInteract = dropConfig[draggedItem.item.name].canInteract(itemInSlot.item)

            canInteract && dropConfig[draggedItem.item.name].onInteract(itemInSlot)
        }

        !canInteract && playSound(dropSounds[draggedItem.item.type] ?? 'drop_default');

        if (canPlaceItem(items, activeTab, slotIndex, draggedItem.item, inventorySize)) {

            setItems(prev =>
                prev.map(item => item.tab === draggedItem.tab && item.slot === draggedItem.slot ? { ...item, tab: activeTab, slot: slotIndex } : item)
            );
        }
        resetDrag();
    }

    const dropOnBlacksmith = () => {

        handleStartUpgrade(draggedItem);
        resetDrag();
    }

    const handleDropItem = (e) => {
        if (!draggedItem) return;
        console.log('dropping')


        const dropTarget = e.target.closest('[drop-target]')?.getAttribute('drop-target');

        if (dropTarget === 'inventory-slot') dropOnSlot()
        if (dropTarget === 'blacksmith') dropOnBlacksmith();


    }

    const updateSlotsPreview = (index) => {
        let slots = getSelectedSlots(index, draggedItem.item.size, inventorySize);

        const firstHoveredSlot = slots.find(slot =>
            findItemBySlot(items, activeTab, slot, inventorySize)
        );

        handleHoverSlot(firstHoveredSlot)

        targetItem.current = findItemBySlot(items, activeTab, firstHoveredSlot, inventorySize)

        let status = 'valid'

        if (targetItem.current) {

            const canInteract = dropConfig[draggedItem.item.name]?.canInteract(targetItem.current.item) ?? false
            status = canInteract ? 'interaction' : 'invalid';

            dropConfig[draggedItem.item.name] ? slots = getItemSlots(targetItem.current, inventorySize) : '';

        }
        else {

            status = itemOriginSlots.current.every(slot => slots.includes(slot))
                ? 'valid'
                : (canPlaceItem(items, activeTab, Math.min(...slots), draggedItem.item, inventorySize) ? 'valid' : 'invalid');
        }


        slotsPreview.current = ({ slots: [...slots], status });

    }

    const handleUpdateSlotsPreview = (index) => {

        if (draggedItem) {
            updateSlotsPreview(index);
            return;
        }

        handleHoverSlot(index);
    }

    const clearSlotsPreview = () => {
        slotsPreview.current = { slots: [], status: 'valid' }
    }


    useEffect(() => {

        const handleMouseUp = (e) => {


            if (!draggedItem) return;
            if (moveMode.current === 'click') {

                handleDropItem(e);

                return;
            } if (moveMode.current === 'drag') {

                handleDropItem(e);
            } else {
                moveMode.current = 'click';

            }
        }

        const handleMouseMove = (e) => {
            if (!draggedItem) return;
            if (moveMode.current !== null) return;

            const moveX = Math.abs(e.clientX - startPos.current.x)
            const moveY = Math.abs(e.clientY - startPos.current.y)

            if (moveX > 5 || moveY > 5) {
                moveMode.current = "drag"

            }
        }
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

    }, [draggedItem])

    return { draggedItem, slotsPreview, handleClickSlot, handleUpdateSlotsPreview, clearSlotsPreview }
}

export default useInventoryDrag