import { useContext, useEffect, useState } from 'react'
import '../styles/ItemSpawner.css'
import ItemPicker from './ItemPicker';
import ItemFilter from './ItemFilter';
import { findItemBySlot, placeItemsInGrid } from '../utils/inventory';
import { itemsDB } from "../data/itemsDB";
import LocaleContext from '../contexts/LocaleContext';

const ItemSpawner = ({ spawnItem }) => {

    const [itemToSpawn, setItemToSpawn] = useState(null);
    const [showModal, setShowModal] = useState(false)
    const [filteredItems, setFilteredItems] = useState(itemsDB)
    const gridSize = { x: 5, y: 6 };
    const { translate } = useContext(LocaleContext);

    const placedItems = placeItemsInGrid(filteredItems, gridSize);

    const handleSpawnItem = (item) => {
        const itemId = item.item.id;
        spawnItem(itemId);
    }

    return (
        <div className='item-spawner'>
            <div className='select-item' onClick={() => setShowModal(true)}><span>{itemToSpawn?.item.name ?? translate('ui.select_item')}</span></div>
            {itemToSpawn &&
                <button className='spawn-button' onClick={() => handleSpawnItem(itemToSpawn)}>Spawn</button>}

            {showModal &&
                <div className='modal'>
                    <button className='close-modal-button' onClick={() => setShowModal(false)} title={translate('ui.close')}>&times;</button>

                    <ItemFilter setFilteredItems={setFilteredItems} />
                    <ItemPicker items={placedItems} inventorySize={gridSize} setItemToSpawn={setItemToSpawn} />
                </div>
            }

        </div>
    )
}

export default ItemSpawner