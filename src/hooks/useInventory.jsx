import { useState } from "react";
import { canPlaceItem } from '../utils/inventory'
import { itemsDB } from '../data/itemsDB'
import { hasAvg } from "../utils/item";
import { generateAvgAndSkillBonus } from "../utils/bonuses";
const useInventory = () => {

    const inventorySize = { x: 5, y: 9 };
    const tabCount = 2;
    const [items, setItems] = useState([])

    const addItem = (itemInstance) => {


        if (hasAvg(itemInstance.item)) {

            const { avgDmg, skillDmg } = generateAvgAndSkillBonus();

            itemInstance.bonuses.avg_dmg = avgDmg;
            itemInstance.bonuses.skill_dmg = skillDmg;
        }

        setItems((prev) => {
            let updated = structuredClone(prev)
            updated = [...updated, itemInstance];
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

    const replaceItem = (instanceId, newItemId) => {

        const newItem = itemsDB.find(item => item.id === newItemId);
        if (!newItem) return;

        setItems(prev => {
            let updated = structuredClone(prev);
            const instance = updated.find(instance => instance.instanceId === instanceId)
            if (!instance) return;
            instance.item = newItem
            return updated;
        })
    }


    const removeItem = (instanceId) => {
        setItems(prev =>
            prev.filter(instance => instance.instanceId !== instanceId)
        )
    }


    return { items, setItems, spawnItem, inventorySize, tabCount, replaceItem, removeItem }
};

export default useInventory;
