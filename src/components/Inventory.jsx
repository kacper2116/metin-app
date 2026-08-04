import { useEffect, useState, useRef, useContext } from "react"
import '../styles/Inventory.css'
import Tooltip from "./Tooltip"
import InventoryTabs from "./InventoryTabs"
import InventoryGrid from "./InventoryGrid"
import Ghost from "./Ghost"
import TooltipContent from "./TooltipContent"
import useInventoryItems from "../hooks/useInventoryItems"
import useInventoryDrag from "../hooks/useInventoryDrag"
import useSlotHover from "../hooks/useSlotHover"
import MouseContext from "../contexts/MouseContext"
import TooltipContext from "../contexts/TooltipContext"
import items_arr from "../data/items.json";

const Inventory = ({ inventorySize, inventory }) => {

    const [activeTab, setActiveTab] = useState(0)
    const tooltipRef = useRef(null);
    const inventoryRef = useRef(null);
    const tabCount = 2;

    const { items, setItems, spawnItem, findItemBySlot, canPlaceItem } = inventory;

    const { hoveredItem, setHoveredItem, handleHoverSlot, clearHover } = useSlotHover({ items, activeTab, inventorySize });

    const { draggedItem, slotsPreview, handleClickSlot, handleUpdateSlotsPreview, clearSlotsPreview } = useInventoryDrag({
        items, setItems, activeTab, canPlaceItem, inventorySize, handleHoverSlot
    });

    const mousePosition = useContext(MouseContext)

    const activeTabItems = items?.filter(item => item.tab === activeTab);

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

            {draggedItem && <Ghost draggedItem={draggedItem} />}
        </div>
    )
}

export default Inventory