import { useState } from "react";
import { canPlaceItem } from '../utils/inventory'
import { itemsDB } from '../data/itemsDB'

const useInventoryItems = ({ inventorySize }) => {

    const [items, setItems] = useState([])

    const addItem = (item) => {
        setItems((prev) => {
            let updated = structuredClone(prev)
            updated = [...updated, item];
            return updated;
        })
    }

    const spawnItem = (id) => {

        const itemToSpawn = itemsDB.find(item => item.id === id);

        for (let tab = 0; tab < 2; tab++) {

            for (let slot = 0; slot < inventorySize.x * inventorySize.y; slot++) {
                if (canPlaceItem(items, tab, slot, itemToSpawn, inventorySize)) {
                    const itemInstance = { instanceId: crypto.randomUUID(), item: itemToSpawn, bonuses: [], stones: [], slot: slot, tab: tab }

                    addItem(itemInstance);
                    return;
                }
            }
        }
    }
    return { items, setItems, spawnItem, inventorySize }
};

/* const replaceItem = (instanceId, newItem) => {
    setItems(prev => {
        let updated = structuredClone(prev);
      
    })
} */

/* const destroyItem = (instanceId) => {
    setItems(prev => {
        let updated = structuredClone(prev);
        updated.filter(instance => instance.instanceId !== instanceId);
        return updated;
    })
}
 */


export default useInventoryItems;
