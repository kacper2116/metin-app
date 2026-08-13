import './App.css'
import './styles/global.css'
import Inventory from './components/Inventory'
import Blacksmith from './components/Blacksmith'
import ItemSpawner from './components/ItemSpawner'
import useInventoryItems from './hooks/useInventoryItems'
import { useState } from 'react'
const App = () => {

  const inventorySize = { x: 5, y: 9 };
  const inventory = useInventoryItems({ inventorySize })


  return (
    <div className='app-container'>
      <Blacksmith />
      <div className='inventory-wrapper'>
        <ItemSpawner inventorySize={inventorySize} spawnItem={inventory.spawnItem} />
        <Inventory inventorySize={inventorySize} inventory={inventory} />

      </div>
    </div>
  )
}

export default App
