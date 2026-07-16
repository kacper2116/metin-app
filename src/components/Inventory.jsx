import { useEffect, useState, useRef } from "react"
import '../styles/Inventory.css'
import Tooltip from "./Tooltip"
import InventoryTabs from "./InventoryTabs"
import useInventoryItems from "../hooks/useInventoryItems"
import useInventoryDrag from "../hooks/useInventoryDrag"
import useMousePosition from '../hooks/useMousePosition'
import InventoryGrid from "./InventoryGrid"
import Ghost from "./Ghost"
import items_arr from "../data/items.json";
import useTooltipPosition from "../hooks/useTooltipPosition"
import useSlotHover from "../hooks/useSlotHover"

const Inventory = () => {

    const [activeTab, setActiveTab] = useState(0)
    const tooltipRef = useRef(null);
    const inventoryRef = useRef(null);
    const tabCount = 2;
    const inventorySize = { x: 5, y: 9 };



    const { items, setItems, spawnItem, findItemBySlot, canPlaceItem } = useInventoryItems({ inventorySize });

    const { hoveredItem, setHoveredItem, handleHoverSlot, clearHover } = useSlotHover({ items, activeTab, inventorySize });

    const { draggedItem, hoveredSlots, handleClickSlot, handleHighlightSlots } = useInventoryDrag({
        items, setItems, activeTab, canPlaceItem, inventorySize, handleHoverSlot
    });


    const mousePosition = useMousePosition();

    const tooltipPosition = useTooltipPosition({ tooltipRef, mousePosition, hoveredItem });


    const showItemTooltip = (item) => {
        console.log("showing tooltip")
    }

    const tabsProps = {
        activeTab,
        setActiveTab,
        tabCount
    }

    const gridProps = {
        items,
        inventorySize,
        activeTab,
        handleClickSlot,
        hoveredSlots,
        handleHighlightSlots,
        clearHover,
    }

    return (
        <div className="inventory" ref={inventoryRef}>
            <InventoryTabs {...tabsProps} />
            <InventoryGrid {...gridProps} />

            <button onClick={() => spawnItem(1)}>Add item</button>
            {draggedItem && <Ghost draggedItem={draggedItem} />}


            {hoveredItem &&
                <Tooltip mousePosition={mousePosition} >
                    {hoveredItem.item.name}
                </Tooltip>}

        </div>
    )
}

export default Inventory