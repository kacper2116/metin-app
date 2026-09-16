import { useContext } from 'react'
import { useState, useEffect, useRef } from 'react';
import { getSelectedSlots, getItemSlots, findItemBySlot, canPlaceItem } from '../utils/inventory';
import MouseContext from '../contexts/MouseContext';
import UpgradeContext from '../contexts/UpgradeContext';
import InventoryContext from '../contexts/InventoryContext';
import { playSound, dropSounds } from '../utils/audio'
import WindowContext from '../contexts/WindowContext';

const useInventoryDrag = ({ items, setItems, activeTab, inventorySize, handleHoverSlot, clearHover }) => {

    const [draggedItemId, setDraggedItemId] = useState(null);
    const [itemToDrop, setItemToDrop] = useState(false);
    const targetItem = useRef(null);
    const draggedItem = items.find(
        item => item.instanceId === draggedItemId
    ) ?? null;

    const { activeWindow } = useContext(WindowContext);

    const slotsPreview = useRef({ slots: [], status: 'valid' });
    const startPos = useRef({ x: 0, y: 0 });
    const moveMode = useRef(null);
    const itemOriginSlots = useRef([]);
    const { handleStartUpgrade, itemToUpgrade } = useContext(UpgradeContext);
    const { removeItem } = useContext(InventoryContext)
    const mousePosition = useContext(MouseContext);
    const touchStartPos = useRef({ x: 0, y: 0 });
    const pressTimer = useRef(null);
    const isPressed = useRef(null);

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


    const grabItem = (slotIndex, itemInSlot, e) => {
        playSound('drag_item');
        setDraggedItemId(itemInSlot.instanceId)
        startPos.current = { x: e.clientX, y: e.clientY };
        itemOriginSlots.current = getItemSlots(itemInSlot, inventorySize);
        slotsPreview.current = ({ slots: getSelectedSlots(slotIndex, itemInSlot.item.size, inventorySize), status: 'valid' });
    }

    const handlePointerDown = (e) => {

        const slotIndex = Number(e.currentTarget.id.split('-')[1]);
        const itemInSlot = findItemBySlot(items, activeTab, slotIndex, inventorySize);

        if (e.pointerType === 'touch') {

            touchStartPos.current = { x: e.clientX, y: e.clientY };

            pressTimer.current = setTimeout(() => {
                if (!itemInSlot) return;
                isPressed.current = true;
                grabItem(slotIndex, itemInSlot, e);
                handleHoverSlot(slotIndex)
            }, 300)


            return;

        }

        if (draggedItem) {
            handleDropItem(e);
            return;
        }

        if (itemInSlot) {
            grabItem(slotIndex, itemInSlot, e);
        }
    }



    const resetDrag = () => {
        slotsPreview.current = ({ slots: [], status: 'valid' });
        setDraggedItemId(null);
        moveMode.current = null;
        itemOriginSlots.current = [];
        targetItem.current = null;
    }

    const dropOnSlot = (e) => {


        if (itemToUpgrade || itemToDrop) {
            resetDrag();
            return;
        }

        const slotIndex = slotsPreview.current.slots[0];
        if (e.pointerType === 'mouse') handleHoverSlot(slotIndex);
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

    const dropOnGrond = () => {

        if (activeWindow.current) {
            resetDrag();
            return
        }

        setItemToDrop(draggedItem);
        activeWindow.current = true;

        resetDrag();
    }

    const confirmDropItem = () => {
        if (!itemToDrop) return;

        removeItem(itemToDrop.instanceId)
        setItemToDrop(null);
        activeWindow.current = false;;

    };

    const cancelDropItem = () => {
        setItemToDrop(null);
        activeWindow.current = false;;

    }

    const handleDropItem = (e) => {
        if (!draggedItem) return;



        const element = e.pointerType === 'touch'
            ? document.elementFromPoint(e.clientX, e.clientY)
            : e.target;
        if (element.closest('[data-drop-block]')) return;

        const dropTarget = element.closest('[drop-target]')?.getAttribute('drop-target');

        if (dropTarget === 'inventory-slot') dropOnSlot(e);
        else if (dropTarget === 'blacksmith') dropOnBlacksmith();
        else if (dropTarget === 'ground') dropOnGrond();
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


    const handleMouseMove = (e) => {
        if (!draggedItem) return;
        if (moveMode.current !== null) return;

        const moveX = Math.abs(e.clientX - startPos.current.x)
        const moveY = Math.abs(e.clientY - startPos.current.y)

        if (moveX > 5 || moveY > 5) {
            moveMode.current = "drag"
        }
    }

    const handleTouchMove = (e) => {

        if (!isPressed.current) {
            const moveX = Math.abs(e.clientX - startPos.current.x);
            const moveY = Math.abs(e.clientY - startPos.current.y);

            if (moveX > 10 || moveY > 10) {
                clearTimeout(pressTimer.current);
                pressTimer.current = null;

            }

            return;
        }


        const element = document.elementFromPoint(e.clientX, e.clientY);
        const slot = element?.closest('.slot');

        if (!slot) {
            clearSlotsPreview();
            clearHover();
            return;
        }

        const slotIndex = Number(slot.id.split('-')[1]);

        handleUpdateSlotsPreview(slotIndex)
    }

    useEffect(() => {

        const handlePointerUp = (e) => {

            if (e.pointerType === 'touch') {
                clearTimeout(pressTimer.current);
                pressTimer.current = null;

                if (!isPressed.current) return;

                isPressed.current = false;

                if (draggedItem) {
                    handleDropItem(e);
                    resetDrag();
                    return;
                }

                return;
            }

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

        const handlePointerMove = (e) => {
            if (e.pointerType === 'mouse') handleMouseMove(e);
            if (e.pointerType === 'touch') handleTouchMove(e);
        }
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        }

    }, [draggedItem])

    return { draggedItem, slotsPreview, handlePointerDown, handleUpdateSlotsPreview, clearSlotsPreview, itemToDrop, confirmDropItem, cancelDropItem }
}

export default useInventoryDrag