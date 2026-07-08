import { useState, useEffect } from "react";
import { isSlotEmpty, canPlaceItem } from '../utils/inventory'
import items_arr from '../data/items.json'

const useInventoryItems = ({ inventorySize }) => {

    const [items, setItems] = useState([
        { item: items_arr[0], tab: 0, slot: 0 },
        { item: items_arr[1], tab: 0, slot: 14 },
        { item: items_arr[2], tab: 0, slot: 30 },
    ])

    const addItem = (item) => {
        setItems((prev) => {
            let updated = structuredClone(prev)
            updated = [...updated, item];
            console.log(updated)
            return updated;
        })
    }

    const spawnItem = (id) => {

        const itemToSpawn = items_arr.find(item => item.id === id);

        for (let tab = 0; tab < 2; tab++) {

            for (let slot = 0; slot < inventorySize.x * inventorySize.y; slot++) {
                if (canPlaceItem(items, tab, slot, itemToSpawn, inventorySize)) {
                    addItem({ item: itemToSpawn, tab: tab, slot: slot });
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
