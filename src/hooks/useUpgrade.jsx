import { useContext, useRef, useState } from 'react'
import { getUpgradeChance, isUpgradeSuccess } from '../utils/upgrade';
import InventoryContext from '../contexts/InventoryContext';
import { playSound } from '../utils/audio'

const useUpgrade = () => {

    const [itemToUpgrade, setItemToUpgrade] = useState(null);
    const [upgradeMethod, setUpgradeMethod] = useState('blacksmith')
    const [result, setResult] = useState(null);
    const { replaceItem, removeItem, downgradeItem } = useContext(InventoryContext);
    const upgradeRef = useRef(false);
    const baseChanceMethods = ['blacksmith', 'blessing_scroll', 'magic_stone'];
    const chanceScheme = baseChanceMethods.includes(upgradeMethod) ? 'base' : upgradeMethod;
    const chance = itemToUpgrade ? getUpgradeChance(itemToUpgrade.item, chanceScheme) : null;

    const onFailure = {
        "blacksmith": removeItem,
        "blessing_scroll": downgradeItem,
        "dragon_scroll": downgradeItem,
        "blacksmith_handbook": downgradeItem,
        "magic_stone": () => { },
    }

    const handleStartUpgrade = (itemInstance, method = 'blacksmith') => {

        if (itemInstance.item.next_item_id == null) return;
        if (upgradeRef.current) return;

        setItemToUpgrade(itemInstance);
        setUpgradeMethod(method);
        console.log(itemInstance)
        upgradeRef.current = true;
    }

    const handleEndUpgrade = () => {
        setItemToUpgrade(null);
        setUpgradeMethod('blacksmith');
        setResult(null);
        upgradeRef.current = false;

    }

    const handleUpgrade = () => {
        console.log('upgrading')

        if (isUpgradeSuccess(chance)) {
            setResult('success');
            upgradeSucces();

        } else {
            setResult('failure')
            upgradeFailure()
        };
    }

    const upgradeSucces = () => {
        replaceItem(itemToUpgrade.instanceId, itemToUpgrade.item.next_item_id);
        playSound('upgrade_success')
    }

    const upgradeFailure = () => {
        onFailure[upgradeMethod]?.(itemToUpgrade.instanceId);
        playSound('upgrade_failure')

    }
    return { itemToUpgrade, handleStartUpgrade, handleEndUpgrade, handleUpgrade, upgradeSucces, upgradeFailure, chance, result, isUpgrading: upgradeRef }
}

export default useUpgrade