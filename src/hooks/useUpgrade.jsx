import React, { useState } from 'react'
import { getUpgradeChance, isUpgradeSuccess } from '../utils/upgrade';


const useUpgrade = () => {

    const [itemToUpgrade, setItemToUpgrade] = useState(null);
    const [upgradeMethod, setUpgradeMethod] = useState('blacksmith')
    const [result, setResult] = useState(null);


    const baseChanceMethods = ['blacksmith', 'blessing_scroll', 'magic_stone'];
    const chanceScheme = baseChanceMethods.includes(upgradeMethod) ? 'base' : upgradeMethod;

    const chance = itemToUpgrade ? getUpgradeChance(itemToUpgrade.item, chanceScheme) : null;

    const handleStartUpgrade = (itemInstance, method = 'blacksmith') => {
        setItemToUpgrade(itemInstance);
        setUpgradeMethod(method);
        console.log(itemInstance)
    }

    const handleEndUpgrade = () => {
        setItemToUpgrade(null);
        setUpgradeMethod('blacksmith');
        setResult(null);
    }
    console.log(chance)

    const handleUpgrade = () => {
        console.log('upgrading')



        if (isUpgradeSuccess(chance)) {
            setResult('success');
        } else setResult('failure');

    }

    const upgradeSucces = (itemInstance) => {
        console.log('upgrade success')
        setItems(prev => {
            const updated = structuredClone(prev)
            const index = updated.findIndex(instance => instance.instanceId === itemInstance.instanceId)

            if (index !== -1) updated[index] = itemInstance;
            return updated;
        })
    }

    const upgradeFailure = (itemInstance) => {
        console.log('upgrade failure')
    }

    return { itemToUpgrade, handleStartUpgrade, handleEndUpgrade, handleUpgrade, upgradeSucces, upgradeFailure, chance, result }
}

export default useUpgrade