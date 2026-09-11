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
import WindowContext from '../contexts/WindowContext';
import { playSound } from '../utils/audio';

const ItemSpawner = () => {

    const { spawnItem } = useContext(InventoryContext);
    const [itemToSpawn, setItemToSpawn] = useState(null);

    const [showPicker, setShowPicker] = useState(false)

    const [activeTab, setActiveTab] = useState(0);
    const gridSize = { x: 5, y: 6 };
    const { translate } = useContext(LocaleContext);
    const { activeWindow } = useContext(WindowContext);


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
        showPicker
            ? placeItemsInGrid(filteredItems, gridSize)
            : [],
        [filteredItems, showPicker]

    );

    const handleShowPicker = () => {
        if (activeWindow.current) return;
        setShowPicker(true);
        activeWindow.current = true;
        playSound('click_button')
    }

    const handleClosePicker = () => {
        activeWindow.current = false;
        setShowPicker(false);
    }

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

        <div className='item-spawner' data-drop-block>

            <div className='select-item' onClick={handleShowPicker}><span>{itemDisplayName ?? translate('ui.select_item')}</span></div>
            {itemToSpawn &&
                <Button className='button' onClick={() => handleSpawnItem(itemToSpawn)} title={translate('ui.add_item')}><img height={16} width={32} src='/icons/add_icon.svg' /></Button>}

            {showPicker &&
                <div className='modal'>
                    <Window title="Spawner" onClose={handleClosePicker}>
                        <ItemFilter filter={filter} setFilter={setFilter} setActiveTab={setActiveTab} />

                        <ItemPicker items={placedItems} activeTab={activeTab} setActiveTab={setActiveTab} inventorySize={gridSize} setItemToSpawn={setItemToSpawn} />
                    </Window>
                </div>
            }

        </div>
    )
}

export default ItemSpawner