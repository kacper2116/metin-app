import React, { useEffect, useState } from 'react'
import '../styles/ItemSpawner.css'
import { itemsDB } from "../data/itemsDB";
import ItemPicker from './ItemPicker';
import useInventoryItems from '../hooks/useInventoryItems';
import { findItemBySlot, placeItemsInGrid } from '../utils/inventory';

const ItemSpawner = ({ inventorySize, spawnItem }) => {

    const [itemToSpawn, setItemToSpawn] = useState(null);
    const [showModal, setShowModal] = useState(false)
    const [filter, setFilter] = useState({
        type: 'weapon',
        subtype: null,
        profession: 'warrior',
        plus: 0
    });
    const [filteredItems, setFilteredItems] = useState(itemsDB)
    const spawnerSize = { x: 5, y: 6 };

    const items = placeItemsInGrid(filteredItems, spawnerSize);

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

    const weaponTypes = {
        warrior: [{ value: "sword", label: "miecze" }, { value: "two_handed", label: "dwuręczne" }],
        ninja: [{ value: "sword", label: "miecze" }, { value: "dagger", label: "sztylety" }, { value: "bow", label: "łuki" }],
        sura: [{ value: "sword", label: "miecze" }, { value: "blade", label: "ostrza" }],
        shaman: [{ value: "fans", label: "wachlarze" }, { value: "bell", label: "dzwonki" }]
    }

    const handleSetFilter = (e) => {
        const prop = e.target.name;
        let value = e.target.value

        if (prop === 'plus') value = Number(value);

        setFilter(prev => ({
            ...prev,
            [prop]: prev[prop] === value ? null : value,
        }))
    }

    useEffect(() => {

        if (filter.subtype === null) return;
        setFilter(prev => ({
            ...prev,
            subtype: null
        }))

    }, [filter.profession, filter.type])

    useEffect(() => {
        console.log(filteredItems)

        const filtered = itemsDB.filter(item =>
            item.type === filter.type &&
            (!filter.subtype || item.subtype === filter.subtype) &&
            item.profession.includes(filter.profession) &&
            item.plus === filter.plus
        )


        setFilteredItems(filtered);

    }, [filter])

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
                                    className={`filter-button ${filter.profession === profession.value ? 'active' : ''}`}
                                    onClick={(e) => filter.profession !== profession.value && handleSetFilter(e)}
                                >{profession.label}</button>
                            )}
                        </div>
                        <div className='wrapper'>
                            <div>
                                <select className='filter-type' onChange={handleSetFilter} value={filter.type} name="type">
                                    {filterOptions.type.map(type =>
                                        <option value={type.value} key={type.value}>{type.label}</option>
                                    )}
                                </select>
                                <select className='filter-plus' onChange={handleSetFilter} value={filter.plus} name='plus'>
                                    {filterOptions.plus.map(plus =>
                                        <option key={plus} value={plus}>{'+' + plus}</option>
                                    )}
                                </select>
                            </div>

                            {filter.type === 'weapon' &&
                                <div className='filter-subtype'>
                                    {weaponTypes[filter.profession].map(subtype =>
                                        <button
                                            key={subtype.value}
                                            name='subtype'
                                            value={subtype.value}
                                            className={`filter-button ${filter.subtype === subtype.value ? 'active' : ''}`}
                                            onClick={handleSetFilter}
                                        >{subtype.label[0].toUpperCase() + subtype.label.slice(1)}</button>
                                    )}
                                </div>
                            }
                        </div>

                    </div>

                    <ItemPicker items={items} inventorySize={spawnerSize} setItemToSpawn={setItemToSpawn} />
                </div>
            }

        </div>
    )
}

export default ItemSpawner