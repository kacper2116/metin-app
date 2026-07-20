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

    const { draggedItem, slotsPreview, handleClickSlot, handleUpdateSlotsPreview, clearSlotsPreview } = useInventoryDrag({
        items, setItems, activeTab, canPlaceItem, inventorySize, handleHoverSlot
    });


    const mousePosition = useMousePosition();

    const tooltipPosition = useTooltipPosition({ tooltipRef, mousePosition, hoveredItem });

    const activeTabItems = items?.filter(item => item.tab === activeTab);

    const showItemTooltip = (item) => {
        console.log("showing tooltip")
    }

    const tabsProps = {
        activeTab,
        setActiveTab,
        tabCount
    }

    const slotOverlay = (index) => {
        if (!slotsPreview.current.slots?.includes(index)) return null;
        return (
            <div className={`slot-overlay ${!slotsPreview.current.canPlace && 'slot-overlay-red'}`}></div>
        )
    }

    const gridProps = {
        items: activeTabItems,
        inventorySize,
        handleClickSlot,
        slotOverlay,
        handleHoverSlot: handleUpdateSlotsPreview,
        handleLeaveSlot: clearSlotsPreview,
        handleLeaveGrid: clearHover,
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