import React from 'react'

const ItemPicker = ({ items, onItemPick }) => {
    return (
        <div className='inventory'>
            <div className='grid'>
                {Array.from({ length: 5 * 6 }).map((_, index) => {

                    return (
                        <div key={index} id={`slot-${index}`} className='slot'>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ItemPicker