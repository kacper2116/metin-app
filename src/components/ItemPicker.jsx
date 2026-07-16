import React from 'react'
import InventoryGrid from './InventoryGrid'
import useInventoryItems from '../hooks/useInventoryItems'

const ItemPicker = ({ items, size }) => {


    const gridProps = {
        items: items,
        inventorySize: size
    }

    console.log(items)

    return (
        <div className='inventory'>
            <InventoryGrid {...gridProps} />
        </div>
    )
}

export default ItemPicker