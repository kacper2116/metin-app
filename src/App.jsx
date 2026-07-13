import './App.css'
import Inventory from './components/Inventory'
import Blacksmith from './components/Blacksmith'
import ItemSpawner from './components/ItemSpawner'
const App = () => {

  return (
    <>
      <Blacksmith />
      <ItemSpawner />
      <Inventory />
    </>
  )
}

export default App
