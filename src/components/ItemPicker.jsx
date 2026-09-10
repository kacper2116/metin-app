import { useMemo } from 'react'
import InventoryGrid from './InventoryGrid'
import Tooltip from "./Tooltip"
import InventoryTabs from './InventoryTabs'
import useSlotHover from "../hooks/useSlotHover"
import { findItemBySlot } from '../utils/inventory'

const ItemPicker = ({ items, activeTab, setActiveTab, inventorySize, setItemToSpawn }) => {

    const tabCount = useMemo(() =>
        Math.max(...items.map(item => item.tab)) + 1,
        [items]
    )

    const tabItems = useMemo(() =>
        items.filter(item => item.tab === activeTab)
    )

    const { hoveredItem, handleHoverSlot, clearHover } = useSlotHover({ items, activeTab, inventorySize });

    const handlePickItem = (e) => {

        const slotIndex = Number(e.currentTarget.id.split('-')[1]);
        const itemInSlot = findItemBySlot(items, activeTab, slotIndex, inventorySize);
        setItemToSpawn(itemInSlot)
    }

    const gridProps = {
        items: tabItems,
        inventorySize: inventorySize,
        handleHoverSlot: handleHoverSlot,
        handleLeaveSlot: clearHover,
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
        <div className='inventory item-picker'>
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