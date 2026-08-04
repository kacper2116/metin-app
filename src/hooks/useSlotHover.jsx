import React, { useContext, useRef, useState } from 'react'
import useInventoryDrag from './useInventoryDrag';
import { findItemBySlot } from '../utils/inventory';
import TooltipContext from '../contexts/TooltipContext';

const useSlotHover = ({ items, activeTab, inventorySize }) => {

    const { showTooltip, hideTooltip } = useContext(TooltipContext);

    const handleHoverSlot = (index) => {
        const item = findItemBySlot(items, activeTab, index, inventorySize)
        item ? showTooltip(item) : hideTooltip();
    }

    const clearHover = () => hideTooltip();

    return { handleHoverSlot, clearHover }
}

export default useSlotHover