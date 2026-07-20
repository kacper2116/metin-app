import React, { useState } from 'react'
import '../styles/ItemSpawner.css'
import items_arr from "../data/items.json";
import ItemPicker from './ItemPicker';
import useInventoryItems from '../hooks/useInventoryItems';
import { findItemBySlot, placeItemsInGrid } from '../utils/inventory';

const ItemSpawner = () => {

    const [itemToSpawn, setItemToSpawn] = useState(null);
    const [showModal, setShowModal] = useState(false)
    const [results, setResults] = useState(items_arr);
    const [filter, setFilter] = useState(null);
    const size = { x: 5, y: 6 };

    const items = placeItemsInGrid(items_arr, size);

    const handlePickItem = (e) => {

        const slotIndex = Number(e.currentTarget.id.split('-')[1]);
        const itemInSlot = findItemBySlot(items, activeTab, slotIndex, inventorySize);
        setItemToSpawn(itemInSlot)
    }


    console.log(itemToSpawn)

    return (
        <div className='item-spawner'>
            <div className='select-item' onClick={() => setShowModal(true)}>{itemToSpawn ?? 'Wybierz item'}</div>
            <button className='spawn-button'>Spawn</button>

            {showModal &&
                <div className='modal'>
                    <button className='close-modal-button' onClick={() => setShowModal(false)}>X</button>
                    <input type='text' className='search-item' placeholder='Wyszukaj item' />

                    <ItemPicker items={items} size={size} handlePickItem={handlePickItem} />
                </div>
            }

        </div>
    )
}

export default ItemSpawner