import React, { useState } from 'react'
import '../styles/ItemSpawner.css'
import items_arr from "../data/items.json";
import ItemPicker from './ItemPicker';
import useInventoryItems from '../hooks/useInventoryItems';
import { findItemBySlot, placeItemsInGrid } from '../utils/inventory';

const ItemSpawner = ({ inventorySize, spawnItem }) => {

    const [itemToSpawn, setItemToSpawn] = useState(null);
    const [showModal, setShowModal] = useState(false)
    const [filter, setFilter] = useState(null);
    const spawnerSize = { x: 5, y: 6 };

    const items = placeItemsInGrid(items_arr, spawnerSize);

    const handleSpawnItem = (item) => {
        const itemId = item.item.id;
        spawnItem(itemId);
    }

    return (
        <div className='item-spawner'>
            <div className='select-item' onClick={() => setShowModal(true)}>{itemToSpawn?.item.name ?? 'Wybierz item'}</div>
            <button className='spawn-button' onClick={() => handleSpawnItem(itemToSpawn)}>Spawn</button>

            {showModal &&
                <div className='modal'>
                    <button className='close-modal-button' onClick={() => setShowModal(false)}>X</button>
                    <input type='text' className='search-item' placeholder='Wyszukaj item' />

                    <ItemPicker items={items} inventorySize={spawnerSize} setItemToSpawn={setItemToSpawn} />
                </div>
            }

        </div>
    )
}

export default ItemSpawner