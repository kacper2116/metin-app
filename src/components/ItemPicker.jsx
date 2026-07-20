import React, { useRef, useState } from 'react'
import InventoryGrid from './InventoryGrid'
import Tooltip from "./Tooltip"

import useInventoryItems from '../hooks/useInventoryItems'
import useSlotHover from "../hooks/useSlotHover"
import useTooltipPosition from "../hooks/useTooltipPosition"
import useMousePosition from '../hooks/useMousePosition'


const ItemPicker = ({ items, size }) => {

    console.log(items)

    const [activeTab, setActiveTab] = useState(0);
    const tooltipRef = useRef(null);
    const mousePosition = useMousePosition();

    const { hoveredItem, setHoveredItem, handleHoverSlot, clearHover } = useSlotHover({ items, activeTab, inventorySize: size });

    const tooltipPosition = useTooltipPosition({ tooltipRef, mousePosition, hoveredItem });

    const gridProps = {
        items: items,
        inventorySize: size,
        handleHoverSlot: handleHoverSlot,
        handleLeaveGrid: clearHover

    }

    return (
        <div className='inventory'>
            <InventoryGrid {...gridProps} />
            {hoveredItem &&
                <Tooltip mousePosition={mousePosition} >
                    {hoveredItem.item.name}
                </Tooltip>}
        </div>
    )
}

export default ItemPicker