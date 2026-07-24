import React, { useEffect, useState } from 'react'
import '../styles/ItemSpawner.css'
import items_arr from "../data/items.json";
import ItemPicker from './ItemPicker';
import useInventoryItems from '../hooks/useInventoryItems';
import { findItemBySlot, placeItemsInGrid } from '../utils/inventory';

const ItemSpawner = ({ inventorySize, spawnItem }) => {

    const [itemToSpawn, setItemToSpawn] = useState(null);
    const [showModal, setShowModal] = useState(false)
    const [filter, setFilter] = useState({
        type: 'weapon',
        profession: 'warrior',
        plus: 0
    });
    const spawnerSize = { x: 5, y: 6 };
    const items = placeItemsInGrid(items_arr, spawnerSize);

    const handleSpawnItem = (item) => {
        const itemId = item.item.id;
        spawnItem(itemId);
    }

    const filterOptions = {
        type: [
            { value: "weapon", label: "Bronie" },
            { value: "armor", label: "Zbroje" },
            { value: "shield", label: "Tarcze" },
            { value: "helmet", label: "Hełmy" },
            { value: "earring", label: "Kolczyki" },
            { value: "necklace", label: "Naszyjniki" },
            { value: "bracelet", label: "Bransolety" },
            { value: "shoes", label: "Buty" }
        ],
        plus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        profession: [{ value: "warrior", label: "Wojownik" }, { value: "ninja", label: "Ninja" }, { value: "sura", label: "Sura" }, { value: "shaman", label: "Szaman" }]

    }

    const handleSetFilter = (e) => {

        const prop = e.target.name;
        const value = e.target.value
        setFilter(prev => ({
            ...prev,
            [prop]: value
        }))
    }

    return (
        <div className='item-spawner'>
            <div className='select-item' onClick={() => setShowModal(true)}>{itemToSpawn?.item.name ?? 'Wybierz item'}</div>
            <button className='spawn-button' onClick={() => handleSpawnItem(itemToSpawn)}>Spawn</button>

            {showModal &&
                <div className='modal'>
                    <button className='close-modal-button' onClick={() => setShowModal(false)} title='Zamknij'>&times;</button>

                    <div className='filter-options'>
                        <div className='filter-profession' >
                            {filterOptions.profession.map(profession =>
                                <button
                                    key={profession.value}
                                    name="profession"
                                    value={profession.value}
                                    className={`filter-profession-button ${filter.profession === profession.value ? 'active' : ''}`}
                                    onClick={handleSetFilter}
                                >{profession.label}</button>
                            )}
                        </div>
                        <div className='wrapper'>
                            <select className='filter-type' onChange={handleSetFilter} name="type">
                                {filterOptions.type.map(type =>
                                    <option value={type.value} key={type.value}>{type.label}</option>
                                )}
                            </select>
                            <select className='filter-plus' onChange={handleSetFilter} name='plus'>
                                {filterOptions.plus.map(plus =>
                                    <option key={plus} value={plus}>{'+' + plus}</option>
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