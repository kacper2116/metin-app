import React, { useState } from 'react'
import '../styles/ItemSpawner.css'
import items_arr from "../data/items.json";
import ItemPicker from './ItemPicker';

const ItemSpawner = () => {

    const [itemToSpawn, setItemToSpawn] = useState(null);
    const [showModal, setShowModal] = useState(false)
    const [results, setResults] = useState(items_arr);
    const [filter, setFilter] = useState(null);
    console.log(results)

    const filterOptions = {

    }

    return (
        <div className='item-spawner'>
            <div className='select-item' onClick={() => setShowModal(true)}>{itemToSpawn ?? 'Wybierz item'}</div>
            <button className='spawn-button'>Spawn</button>

            {showModal &&
                <div className='modal'>
                    <button className='close-modal-button' onClick={() => setShowModal(false)}>X</button>
                    <input type='text' className='search-item' placeholder='Wyszukaj item' />

                    <ItemPicker />
                </div>
            }

        </div>
    )
}

export default ItemSpawner