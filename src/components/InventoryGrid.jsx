import React from 'react'
import '../styles/InventoryGrid.css'

const InventoryGrid = (props) => {

    const { items, inventorySize, activeTab, handleClickSlot, slotsPreview, handleUpdateSlotsPreview, clearHover, clearSlotsPreview } = props;

    return (
        <div className="grid" onMouseLeave={clearHover}>
            {Array.from({ length: inventorySize.x * inventorySize.y }).map((_, index) => {

                const item = items?.find(item => item.slot === index);

                return (
                    <div key={index} id={`slot-${index}`} className='slot' onMouseDown={handleClickSlot} onMouseEnter={(e) => handleUpdateSlotsPreview(index)} onMouseLeave={clearSlotsPreview}>
                        {slotsPreview.current.slots?.includes(index) &&
                            <div className={`slot-overlay ${!slotsPreview.current.canPlace && 'slot-overlay-red'}`}></div>
                        }
                        {item &&
                            <div className={`item ${item && 'item-selected'}`}>
                                <img className="item-img" draggable="false" src={item.item.img}></img>
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default InventoryGrid