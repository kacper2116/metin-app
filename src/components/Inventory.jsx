import { useState, useContext, useEffect } from "react"
import '../styles/Inventory.css'

import InventoryTabs from "./InventoryTabs"
import InventoryGrid from "./InventoryGrid"
import Ghost from "./Ghost"
import Window from './Window'


import useInventoryDrag from "../hooks/useInventoryDrag"
import useSlotHover from "../hooks/useSlotHover"
import InventoryContext from "../contexts/InventoryContext"
import Button from "./Button"
import LocaleContext from "../contexts/LocaleContext"
import UpgradeContext from "../contexts/UpgradeContext"

const Inventory = () => {

    const [activeTab, setActiveTab] = useState(0)

    const { items, setItems, inventorySize, tabCount, canPlaceItem } = useContext(InventoryContext);
    const { translate } = useContext(LocaleContext)

    const { handleHoverSlot, clearHover } = useSlotHover({ items, activeTab, inventorySize });


    const { draggedItem, slotsPreview, handleClickSlot, handleUpdateSlotsPreview, clearSlotsPreview, itemToDrop, confirmDropItem, cancelDropItem } = useInventoryDrag({
        items, setItems, activeTab, canPlaceItem, inventorySize, handleHoverSlot
    });

    const activeTabItems = items?.filter(item => item.tab === activeTab);

    const slotOverlay = (index) => {
        if (!slotsPreview.current.slots?.includes(index)) return null;

        return (
            <div className={`slot-overlay slot-overlay-${slotsPreview.current.status}`}></div>
        )
    }

    const tabsProps = {
        activeTab,
        setActiveTab,
        tabCount
    }

    const gridProps = {
        items: activeTabItems,
        inventorySize,
        handleClickSlot,
        slotOverlay,
        handleHoverSlot: handleUpdateSlotsPreview,
        handleLeaveSlot: clearHover,
        handleLeaveGrid: clearSlotsPreview,
    }



    return (
        <div className="inventory" >
            {itemToDrop &&

                <div className="drop-window" data-drop-block>
                    <Window>
                        <span>{translate('ui.drop_warning')}</span>
                        <div className="buttons">
                            <Button className='button' onClick={confirmDropItem}>{translate('ui.yes')}</Button>
                            <Button className='button' onClick={cancelDropItem}>{translate('ui.no')}</Button>
                        </div>

                    </Window>
                </div>}
            <InventoryTabs {...tabsProps} />
            <InventoryGrid {...gridProps} />

            {draggedItem && <Ghost draggedItem={draggedItem} />}
        </div>
    )
}

export default Inventory