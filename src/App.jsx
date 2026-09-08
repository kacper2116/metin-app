import './App.css'
import './styles/global.css'
import Inventory from './components/Inventory'
import Blacksmith from './components/Blacksmith'
import ItemSpawner from './components/ItemSpawner'

import { useContext } from 'react'
import UpgradeContext from './contexts/UpgradeContext'
import LocaleSwitch from './components/LocaleSwitch'
import UpgradeWindow from './components/UpgradeWindow'

const App = () => {

  const { itemToUpgrade } = useContext(UpgradeContext);



  return (
    <div className='app-container'>
      <LocaleSwitch />
      <Blacksmith />
      <div className='inventory-wrapper'>
        <ItemSpawner />
        <Inventory />
        {itemToUpgrade && <UpgradeWindow itemInstance={itemToUpgrade} />}
      </div>
    </div>
  )
}

export default App
