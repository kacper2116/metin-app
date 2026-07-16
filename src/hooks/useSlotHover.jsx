import React, { useRef, useState } from 'react'
import useInventoryDrag from './useInventoryDrag';
import { findItemBySlot } from '../utils/inventory';


const useSlotHover = ({ items, activeTab, inventorySize }) => {

    const [hoveredItem, setHoveredItem] = useState(null);

    const handleHoverSlot = (index) => {
        const item = findItemBySlot(items, activeTab, index, inventorySize)
        setHoveredItem(item);
    }

    const clearHover = () => {
        setHoveredItem(null);
    }

    return { hoveredItem, setHoveredItem, handleHoverSlot, clearHover }
}

export default useSlotHover