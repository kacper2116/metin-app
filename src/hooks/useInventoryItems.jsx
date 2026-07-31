import { useState, useEffect } from "react";
import { isSlotEmpty, canPlaceItem } from '../utils/inventory'
import { itemsDB } from '../data/itemsDB'

const useInventoryItems = ({ inventorySize }) => {

    const [items, setItems] = useState([])

    const addItem = (item) => {
        setItems((prev) => {
            let updated = structuredClone(prev)
            updated = [...updated, item];
            console.log(updated)
            return updated;
        })
    }

    console.log(items)

    const spawnItem = (id) => {

        const itemToSpawn = itemsDB.find(item => item.id === id);

        for (let tab = 0; tab < 2; tab++) {

            for (let slot = 0; slot < inventorySize.x * inventorySize.y; slot++) {
                if (canPlaceItem(items, tab, slot, itemToSpawn, inventorySize)) {
                    const itemInstance = { instanceId: crypto.randomUUID(), item: itemToSpawn, bonuses: [], stones: [], slot: slot, tab: tab }

                    addItem(itemInstance);
                    console.log("Dodano item");
                    return;
                }
            }
        }
        console.log("Nie można dodać itemu")
    }
    return { items, setItems, spawnItem }
};

export default useInventoryItems;
