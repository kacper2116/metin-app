import { useContext, useEffect, useMemo, useState } from 'react'
import '../styles/ItemSpawner.css'
import ItemPicker from './ItemPicker';
import ItemFilter from './ItemFilter';
import { placeItemsInGrid } from '../utils/inventory';
import { itemsDB } from "../data/itemsDB";
import { getItemName } from '../utils/item';
import LocaleContext from '../contexts/LocaleContext';
import InventoryContext from '../contexts/InventoryContext';
import Button from './Button';
import Window from './Window';

const ItemSpawner = () => {

    const { spawnItem } = useContext(InventoryContext);
    const [itemToSpawn, setItemToSpawn] = useState(null);

    const [showModal, setShowModal] = useState(false)

    const [activeTab, setActiveTab] = useState(0);
    const gridSize = { x: 5, y: 6 };
    const { translate } = useContext(LocaleContext);

    const [filter, setFilter] = useState({
        type: 'weapon',
        subtype: 'sword',
        profession: 'warrior',
        plus: 0
    });

    const filteredItems = useMemo(() => {
        return itemsDB.filter(item =>

            item.type === filter.type &&
            (!filter.subtype || item.subtype === filter.subtype) &&
            (!item.profession || item.profession.includes(filter.profession)) &&
            (item.plus == null || item.plus === filter.plus)
        )

    }, [filter])

    useEffect(() => {
        setActiveTab(0)
    }, [filter.type, filter.subtype, filter.profession])

    const placedItems = useMemo(() =>
        showModal
            ? placeItemsInGrid(filteredItems, gridSize)
            : [],
        [filteredItems, showModal]

    );

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
                <Button className='button' onClick={() => handleSpawnItem(itemToSpawn)} title={translate('ui.add_item')}><img height={16} width={32} src='/icons/add_icon.svg' /></Button>}

            {showModal &&
                <div className='modal'>
                    <Window title="Spawner" onClose={() => setShowModal(false)}>

                        <ItemFilter filter={filter} setFilter={setFilter} setActiveTab={setActiveTab} />
                        <ItemPicker items={placedItems} activeTab={activeTab} setActiveTab={setActiveTab} inventorySize={gridSize} setItemToSpawn={setItemToSpawn} />
                    </Window>
                </div>
            }

        </div>
    )
}

export default ItemSpawner