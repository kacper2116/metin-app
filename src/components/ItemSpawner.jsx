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

    const filterOptions = {
        type: [
            "Bronie",
            "Zbroje", "Tarcze", "Hełmy",
            "Kolczyki", "Naszyjniki", "Bransolety", "Buty"
        ],
        plus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        profession: ["Wojownik", "Ninja", "Sura", "Szaman"]

    }


    return (
        <div className='item-spawner'>
            <div className='select-item' onClick={() => setShowModal(true)}>{itemToSpawn?.item.name ?? 'Wybierz item'}</div>
            <button className='spawn-button' onClick={() => handleSpawnItem(itemToSpawn)}>Spawn</button>

            {showModal &&
                <div className='modal'>
                    <button className='close-modal-button' onClick={() => setShowModal(false)}>X</button>

                    {/*  <input type='text' className='search-item' placeholder='Wyszukaj item' /> */}

                    <div className='filter-options'>
                        <div className='filter-profession'>
                            {filterOptions.profession.map(profession =>
                                <button>{profession}</button>
                            )}
                        </div>
                        <div className='wrapper'>
                            <select className='filter-type'>
                                {filterOptions.type.map(type =>
                                    <option key={`type-${type}`}>{type}</option>
                                )}
                            </select>
                            <select className='filter-plus'>
                                {filterOptions.plus.map(plus =>
                                    <option key={`type-${plus}`}>{'+' + plus}</option>
                                )}
                            </select>
                        </div>



                    </div>

                    <ItemPicker items={items} inventorySize={spawnerSize} setItemToSpawn={setItemToSpawn} />
                </div>
            }

        </div>
    )
}

export default ItemSpawner