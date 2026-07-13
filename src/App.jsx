import './App.css'
import Inventory from './components/Inventory'
import Blacksmith from './components/Blacksmith'
import ItemSpawner from './components/ItemSpawner'
const App = () => {

  return (
    <div className='app-container'>
      <Blacksmith />
      <ItemSpawner />
      <Inventory />
    </div>
  )
}

export default App
