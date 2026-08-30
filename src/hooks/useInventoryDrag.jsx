import { useContext } from 'react'
import { useState, useEffect, useRef } from 'react';
import { getSelectedSlots, getItemSlots, findItemBySlot, canPlaceItem } from '../utils/inventory';
import MouseContext from '../contexts/MouseContext';
import UpgradeContext from '../contexts/UpgradeContext';
const useInventoryDrag = ({ items, setItems, activeTab, inventorySize, handleHoverSlot }) => {

    const [draggedItemId, setDraggedItemId] = useState(null);
    const draggedItem = items.find(
        item => item.instanceId === draggedItemId
    ) ?? null;

    const slotsPreview = useRef({ slots: [], canPlace: true });
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

        const slotIndex = Number(e.currentTarget.id.split('-')[1]);
        const itemInSlot = findItemBySlot(items, activeTab, slotIndex, inventorySize);

        if (itemInSlot) {
            setDraggedItemId(itemInSlot.instanceId)
            startPos.current = { x: e.clientX, y: e.clientY };
            itemOriginSlots.current = getItemSlots(itemInSlot, inventorySize);

            let slots = getSelectedSlots(slotIndex, itemInSlot.item.size, inventorySize)

            const canPlace = itemOriginSlots.current.every(slot => slots.includes(slot)) ? true : canPlaceItem(items, activeTab, Math.min(...slots), itemInSlot.item, inventorySize);

            slotsPreview.current = ({ slots: getSelectedSlots(slotIndex, itemInSlot.item.size, inventorySize), canPlace });
        }

    }

    const resetDrag = () => {
        slotsPreview.current = ({ slots: [], canPlace: true });
        setDraggedItemId(null);
        moveMode.current = null;
        itemOriginSlots.current = [];
    }

    const dropOnSlot = () => {

        if (itemToUpgrade) {
            resetDrag();
            return;
        }

        const slotIndex = slotsPreview.current.slots[0];


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
        console.log(firstHoveredSlot)

        const canPlace = itemOriginSlots.current.every(slot => slots.includes(slot))
            ? true
            : canPlaceItem(items, activeTab, Math.min(...slots), draggedItem.item, inventorySize);
        slotsPreview.current = ({ slots: [...slots], canPlace });

    }

    const handleUpdateSlotsPreview = (index) => {

        if (draggedItem) {
            updateSlotsPreview(index);
            return;
        }

        handleHoverSlot(index);
    }

    const clearSlotsPreview = () => {
        slotsPreview.current = { slots: [], canPlace: true }
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