import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { getSelectedSlots, getItemSlots, findItemBySlot, canPlaceItem } from '../utils/inventory';
import useMousePosition from './useMousePosition';

const useInventoryDrag = ({ items, setItems, activeTab, inventorySize }) => {

    const [draggedItem, setDraggedItem] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);

    const hoveredSlots = useRef({ slots: [], canPlace: true })
    const startPos = useRef({ x: 0, y: 0 });
    const moveMode = useRef(null);
    const itemOriginSlots = useRef([]);

    const mousePosition = useMousePosition();

    const handleClickSlot = (e) => {

        if (draggedItem) {
            handleDropItem(e);
            return;
        }

        const slotIndex = Number(e.currentTarget.id.split('-')[1]);
        const itemInSlot = findItemBySlot(items, activeTab, slotIndex, inventorySize);

        if (itemInSlot) {
            setDraggedItem(itemInSlot)
            startPos.current = { x: e.clientX, y: e.clientY };
            itemOriginSlots.current = getItemSlots(itemInSlot, inventorySize);

            let slots = getSelectedSlots(slotIndex, itemInSlot.item.size, inventorySize)

            const canPlace = itemOriginSlots.current.every(slot => slots.includes(slot)) ? true : canPlaceItem(items, activeTab, Math.min(...slots), itemInSlot.item, inventorySize);

            hoveredSlots.current = ({ slots: getSelectedSlots(slotIndex, itemInSlot.item.size, inventorySize), canPlace });
        }

    }

    const handleDropItem = (e) => {
        if (!draggedItem) return;
        console.log('droping item')
        const slotIndex = hoveredSlots.current.slots[0];

        if (canPlaceItem(items, activeTab, slotIndex, draggedItem.item, inventorySize)) {

            setItems(prev =>
                prev.map(item => item.tab === draggedItem.tab && item.slot === draggedItem.slot ? { ...item, tab: activeTab, slot: slotIndex } : item)
            );
        }

        hoveredSlots.current = ({ slots: [], canPlace: true });
        setDraggedItem(null);
        moveMode.current = null;
        itemOriginSlots.current = [];
    }

    const highlightSlots = (index) => {
        let slots = getSelectedSlots(index, draggedItem.item.size, inventorySize);

        const canPlace = itemOriginSlots.current.every(slot => slots.includes(slot))
            ? true
            : canPlaceItem(items, activeTab, Math.min(...slots), draggedItem.item, inventorySize);
        hoveredSlots.current = ({ slots: [...slots], canPlace });
    }

    const handleHoverSlot = (index) => {
        if (draggedItem) {
            highlightSlots(index);
        }

        const item = findItemBySlot(items, activeTab, index, inventorySize)
        if (item) {
            console.log("show item tooltip")
        }
    }

    useEffect(() => {

        const handleMouseUp = (e) => {

            console.log('pointer up')
            if (!draggedItem) return;
            if (moveMode.current === 'click') {
                console.log('click drop end');

                return;
            } if (moveMode.current === 'drag') {
                console.log('drag end');
                handleDropItem(e);
            } else {
                moveMode.current = 'click';
                console.log('click drop start');
            }
        }

        const handleMouseMove = (e) => {
            if (!draggedItem) return;
            if (moveMode.current !== null) return;

            const moveX = Math.abs(e.clientX - startPos.current.x)
            const moveY = Math.abs(e.clientY - startPos.current.y)

            if (moveX > 5 || moveY > 5) {
                moveMode.current = "drag"
                console.log("drag start")
            }
        }
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

    }, [draggedItem])

    return { draggedItem, hoveredSlots, handleClickSlot, handleHoverSlot }
}

export default useInventoryDrag