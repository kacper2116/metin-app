import './App.css'
import './styles/global.css'
import Inventory from './components/Inventory'
import Blacksmith from './components/Blacksmith'
import ItemSpawner from './components/ItemSpawner'
import useInventoryItems from './hooks/useInventoryItems'
import { useContext, useState } from 'react'
import UpgradeContext from './contexts/UpgradeContext'
import UpgradeWindow from './components/UpgradeWindow'
const App = () => {

  const inventorySize = { x: 5, y: 9 };
  const inventory = useInventoryItems({ inventorySize })
  const { itemToUpgrade } = useContext(UpgradeContext);


  return (
    <div className='app-container'>
      <Blacksmith />
      <div className='inventory-wrapper'>
        <ItemSpawner inventorySize={inventorySize} spawnItem={inventory.spawnItem} />
        <Inventory inventory={inventory} />
        {itemToUpgrade && <UpgradeWindow itemInstance={itemToUpgrade} />}
      </div>
    </div>
  )
}

export default App
