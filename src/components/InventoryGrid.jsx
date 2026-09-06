import '../styles/InventoryGrid.css'

const InventoryGrid = (props) => {

    const { items, inventorySize, handleClickSlot, slotOverlay, handleHoverSlot, handleLeaveGrid, handleLeaveSlot } = props;
    const canDrop = props.canDrop ?? true;

    return (
        <div className="grid" onMouseLeave={handleLeaveGrid}>
            {Array.from({ length: inventorySize.x * inventorySize.y }).map((_, index) => {

                const item = items?.find(item => item.slot === index);

                return (
                    <div key={index} id={`slot-${index}`} className='slot'
                        drop-target={canDrop ? "inventory-slot" : undefined} onMouseDown={(e) => handleClickSlot?.(e)} onMouseEnter={(e) => handleHoverSlot?.(index)} onMouseLeave={handleLeaveSlot}>
                        {slotOverlay?.(index)}
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