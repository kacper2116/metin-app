import '../styles/InventoryGrid.css'

const InventoryGrid = (props) => {

    const { items, inventorySize, handlePointerDown, handlePointerUp, handlePointerMove, slotOverlay, handleHoverSlot, handleLeaveGrid, handleLeaveSlot, } = props;
    const canDrop = props.canDrop ?? true;

    return (
        <div className="grid" onMouseLeave={handleLeaveGrid}>
            {Array.from({ length: inventorySize.x * inventorySize.y }).map((_, index) => {

                const item = items?.find(item => item.slot === index);

                return (
                    <div key={index} id={`slot-${index}`} className='slot'
                        drop-target={canDrop ? "inventory-slot" : undefined} onPointerDown={(e) => handlePointerDown?.(e)}
                        onPointerMoveCapture={(e) => e.pointerType === 'mouse' ? handleHoverSlot?.(index) : handlePointerMove?.(e)} onMouseLeave={handleLeaveSlot}
                        onPointerUp={(e) => e.pointerType === 'touch' && handlePointerUp?.(e)}



                    >
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