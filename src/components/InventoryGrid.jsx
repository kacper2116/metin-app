import React from 'react'
import '../styles/InventoryGrid.css'

const InventoryGrid = (props) => {

    const { items, inventorySize, activeTab, handleClickSlot, handleHoverSlot, hoveredSlots } = props;

    return (
        <div className="grid">
            {Array.from({ length: inventorySize.x * inventorySize.y }).map((_, index) => {

                const itemsOnPage = items?.filter(item => item.tab === activeTab);
                const item = itemsOnPage?.find(item => item.slot === index);

                return (
                    <div key={index} id={`slot-${index}`} className='slot' onMouseDown={handleClickSlot} onMouseEnter={(e) => handleHoverSlot(index)} onMouseLeave={(e) => hoveredSlots.current = ({ slots: [], canPlace: true })}>
                        {hoveredSlots.current.slots?.includes(index) &&
                            <div className={`slot-overlay ${!hoveredSlots.current.canPlace && 'slot-overlay-red'}`}></div>
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