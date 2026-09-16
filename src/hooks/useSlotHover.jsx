import { useContext, useEffect, useRef } from 'react'
import { findItemBySlot } from '../utils/inventory';
import TooltipContext from '../contexts/TooltipContext';

const useSlotHover = ({ items, activeTab, inventorySize }) => {

    const { showTooltip, hideTooltip } = useContext(TooltipContext);

    const hoveredSlot = useRef(null);

    const handleHoverSlot = (index) => {
        if (hoveredSlot.current === index) return;
        hoveredSlot.current = index;
        const item = findItemBySlot(items, activeTab, index, inventorySize)
        item ? showTooltip(item) : hideTooltip();
    }

    const clearHover = () => {
        hoveredSlot.current = null;
        hideTooltip();
    }

    useEffect(() => {

        if (hoveredSlot.current === null) return;

        const item = findItemBySlot(items, activeTab, hoveredSlot.current, inventorySize);

        item ? showTooltip(item) : hideTooltip();
    }, [items, activeTab])

    return { handleHoverSlot, clearHover }
}

export default useSlotHover