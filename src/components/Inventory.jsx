import { useEffect, useState, useRef } from "react"
import './Inventory.css'
import Tooltip from "./Tooltip"
import InventoryTabs from "./InventoryTabs"
import useInventoryItems from "../hooks/useInventoryItems"
import useInventoryDrag from "../hooks/useInventoryDrag"
import useMousePosition from '../hooks/useMousePosition'
import items_arr from "../data/items.json";
import InventoryGrid from "./InventoryGrid"

const Inventory = () => {

    const [activeTab, setActiveTab] = useState(0)
    const tabCount = 2;
    const inventorySize = { x: 5, y: 9 };

    const mousePosition = useMousePosition();
    const { items, setItems, spawnItem, findItemBySlot, canPlaceItem } = useInventoryItems({ inventorySize });

    const { draggedItem, hoveredSlots, handleClickSlot, handleHoverSlot } = useInventoryDrag({
        items, setItems, activeTab, canPlaceItem, inventorySize
    });

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
        handleHoverSlot,
        hoveredSlots
    }

    return (
        <div className="inventory">
            <InventoryTabs {...tabsProps} />
            <InventoryGrid {...gridProps} />

            <button onClick={() => spawnItem(1)}>Add item</button>
            {draggedItem && (
                <img src={draggedItem.item.img} draggable="false" className="ghost-img" style=
                    {{
                        left: mousePosition.x,
                        top: mousePosition.y
                    }} />
            )}

            <Tooltip>
                siemka
            </Tooltip>
        </div>
    )
}

export default Inventory