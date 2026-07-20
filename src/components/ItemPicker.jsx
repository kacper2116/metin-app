import React, { useEffect, useRef, useState } from 'react'
import InventoryGrid from './InventoryGrid'
import Tooltip from "./Tooltip"

import useInventoryItems from '../hooks/useInventoryItems'
import useSlotHover from "../hooks/useSlotHover"
import useTooltipPosition from "../hooks/useTooltipPosition"
import useMousePosition from '../hooks/useMousePosition'
import { canPlaceItem, findItemBySlot } from '../utils/inventory'
import InventoryTabs from './InventoryTabs'


const ItemPicker = ({ items, inventorySize, setItemToSpawn }) => {

    const [activeTab, setActiveTab] = useState(0);
    const [tabCount, setTabCount] = useState(1);
    const [placedItems, setPlacedItems] = useState([]);
    const tooltipRef = useRef(null);
    const mousePosition = useMousePosition();

    const { hoveredItem, setHoveredItem, handleHoverSlot, clearHover } = useSlotHover({ items, activeTab, inventorySize });

    const tooltipPosition = useTooltipPosition({ tooltipRef, mousePosition, hoveredItem });

    const handlePickItem = (e) => {

        const slotIndex = Number(e.currentTarget.id.split('-')[1]);
        const itemInSlot = findItemBySlot(items, activeTab, slotIndex, inventorySize);
        setItemToSpawn(itemInSlot)
    }

    useEffect(() => {
        setPlacedItems(items.filter(item => item.tab === activeTab))
        setTabCount(Math.max(...items.map(item => item.tab)) + 1)
    }, [items, activeTab])


    const gridProps = {
        items: placedItems,
        inventorySize: inventorySize,
        handleHoverSlot: handleHoverSlot,
        handleLeaveGrid: clearHover,
        handleClickSlot: handlePickItem
    }

    const tabsProps = {
        activeTab,
        setActiveTab,
        tabCount: tabCount
    }

    return (
        <div className='inventory'>
            {tabCount > 1 && <InventoryTabs {...tabsProps} />}

            <InventoryGrid {...gridProps} />

            {hoveredItem &&
                <Tooltip mousePosition={mousePosition} >
                    {hoveredItem.item.name}
                </Tooltip>}
        </div>
    )
}

export default ItemPicker