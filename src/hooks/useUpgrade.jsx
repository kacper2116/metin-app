import React, { useState } from 'react'


const useUpgrade = () => {

    const [itemToUpgrade, setItemToUpgrade] = useState(null);
    const [upgradeMethod, setUpgradeMethod] = useState('blacksmith')

    const handleStartUpgrade = (itemInstance, method = 'blacksmith') => {
        setItemToUpgrade(itemInstance);
        setUpgradeMethod(method);
        console.log(itemInstance)
    }

    const handleEndUpgrade = () => {
        setItemToUpgrade(false);
    }

    const handleUpgrade = () => {
        console.log('upgrading')
        handleEndUpgrade();
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

    return { itemToUpgrade, handleStartUpgrade, handleEndUpgrade, handleUpgrade, upgradeSucces, upgradeFailure }
}

export default useUpgrade