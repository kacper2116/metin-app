import { useEffect, useRef, useState } from 'react'
import InventoryGrid from './InventoryGrid'
import Tooltip from "./Tooltip"
import InventoryTabs from './InventoryTabs'
import useInventory from '../hooks/useInventory'
import useSlotHover from "../hooks/useSlotHover"
import { canPlaceItem, findItemBySlot } from '../utils/inventory'



const ItemPicker = ({ items, activeTab, setActiveTab, inventorySize, setItemToSpawn }) => {


    const [tabCount, setTabCount] = useState(1);
    const [placedItems, setPlacedItems] = useState([]);

    const { hoveredItem, handleHoverSlot, clearHover } = useSlotHover({ items, activeTab, inventorySize });

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
        handleClickSlot: handlePickItem,
        canDrop: false

    }

    const tabsProps = {
        activeTab,
        setActiveTab,
        tabCount: tabCount
    }


    return (
        <div className='inventory'>
            {tabCount > 1 && <InventoryTabs {...tabsProps} />}

            <InventoryGrid {...gridProps} canDrop={false} />

            {hoveredItem &&
                <Tooltip mousePosition={mousePosition} >
                    {hoveredItem.item.name}
                </Tooltip>}
        </div>
    )
}

export default ItemPicker