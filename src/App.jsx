import './App.css'
import './styles/global.css'
import Inventory from './components/Inventory'
import Blacksmith from './components/Blacksmith'
import ItemSpawner from './components/ItemSpawner'
import useInventoryItems from './hooks/useInventoryItems'
import { useState } from 'react'
import UpgradeWindow from './components/UpgradeWindow'
const App = () => {

  const inventorySize = { x: 5, y: 9 };
  const inventory = useInventoryItems({ inventorySize })
  const [itemToUpgrade, setItemToUpgrade] = useState(null)


  return (
    <div className='app-container'>
      <Blacksmith />
      <div className='inventory-wrapper'>
        <ItemSpawner inventorySize={inventorySize} spawnItem={inventory.spawnItem} />
        <Inventory inventorySize={inventorySize} inventory={inventory} setItemToUpgrade={setItemToUpgrade} />
      </div>
      {itemToUpgrade && <UpgradeWindow itemToUpgrade={itemToUpgrade} />}


    </div>
  )
}

export default App
