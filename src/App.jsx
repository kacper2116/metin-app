import './App.css'
import Inventory from './components/Inventory'
import Blacksmith from './components/Blacksmith'
import ItemSpawner from './components/ItemSpawner'
const App = () => {

  return (
    <div className='app-container'>
      <Blacksmith />
      <div className='inventory-wrapper'>
        <ItemSpawner />
        <Inventory />
      </div>
    </div>
  )
}

export default App
