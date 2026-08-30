import { useContext, useState } from 'react'
import '../styles/ItemSpawner.css'
import ItemPicker from './ItemPicker';
import ItemFilter from './ItemFilter';
import { placeItemsInGrid } from '../utils/inventory';
import { itemsDB } from "../data/itemsDB";
import { getItemName } from '../utils/item';
import LocaleContext from '../contexts/LocaleContext';
import InventoryContext from '../contexts/InventoryContext';
import Window from './Window';

const ItemSpawner = () => {

    const { spawnItem } = useContext(InventoryContext);
    const [itemToSpawn, setItemToSpawn] = useState(null);

    const [showModal, setShowModal] = useState(false)
    const [filteredItems, setFilteredItems] = useState(itemsDB)
    const [activeTab, setActiveTab] = useState(0);
    const gridSize = { x: 5, y: 6 };
    const { translate } = useContext(LocaleContext);

    const [filter, setFilter] = useState({
        type: 'weapon',
        subtype: null,
        profession: 'warrior',
        plus: 0
    });


    const placedItems = placeItemsInGrid(filteredItems, gridSize);

    const handleSpawnItem = (item) => {
        const itemId = item.item.id;
        spawnItem(itemId);
    }

    const item = itemToSpawn?.item;
    let itemDisplayName = null;

    if (item) {
        itemDisplayName = item?.plus != null ? translate(`items.${getItemName(item)}`) + '+' + item.plus : translate(`items.${getItemName(item)}`);
    }


    return (

        <div className='item-spawner'>
            <div className='select-item' onClick={() => setShowModal(true)}><span>{itemDisplayName ?? translate('ui.select_item')}</span></div>
            {itemToSpawn &&
                <button className='spawn-button button-basic' onClick={() => handleSpawnItem(itemToSpawn)}>Spawn</button>}

            {showModal &&
                <div className='modal'>
                    <Window title="Spawner" onClose={() => setShowModal(false)}>

                        <ItemFilter filter={filter} setFilter={setFilter} setFilteredItems={setFilteredItems} setActiveTab={setActiveTab} />
                        <ItemPicker items={placedItems} activeTab={activeTab} setActiveTab={setActiveTab} inventorySize={gridSize} setItemToSpawn={setItemToSpawn} />
                    </Window>
                </div>
            }

        </div>
    )
}

export default ItemSpawner