import { useEffect, useState, useRef } from "react"
import './Inventory.css'
import Tooltip from "./Tooltip"
import InventoryTabs from "./InventoryTabs"
import useInventoryItems from "../hooks/useInventoryItems"
import useInventoryDrag from "../hooks/useInventoryDrag"
import useMousePosition from '../hooks/useMousePosition'
import items_arr from "../data/items.json";

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

    return (
        <div className="inventory">
            <InventoryTabs {...tabsProps} />

            <div className="slots">
                {Array.from({ length: inventorySize.x * inventorySize.y }).map((_, index) => {

                    const itemsOnPage = items?.filter(item => item.tab === activeTab);
                    const item = itemsOnPage?.find(item => item.slot === index);

                    return (
                        <div key={index} id={`slot-${index}`} className='slot' onMouseDown={handleClickSlot} onMouseEnter={(e) => handleHoverSlot(index)} onMouseLeave={(e) => hoveredSlots.current = ({ slots: [], canPlace: true })}>
                            {hoveredSlots.current.slots?.includes(index) &&
                                <div className={`slot-overlay ${!hoveredSlots.current.canPlace && 'slot-overlay-red'}`}></div>
                            }
                            {item &&
                                <div className={`item ${draggedItem && 'item-selected'}`}>
                                    <img className="item-img" draggable="false" src={item.item.img}></img>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
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