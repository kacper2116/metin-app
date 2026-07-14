import './App.css'
import Inventory from './components/Inventory'
import Blacksmith from './components/Blacksmith'
import ItemPicker from './components/ItemPicker'
const App = () => {

  return (
    <div className='app-container'>
      <Blacksmith />
      <div className='inventory-wrapper'>
        <ItemPicker />
        <Inventory />
      </div>
    </div>
  )
}

export default App
