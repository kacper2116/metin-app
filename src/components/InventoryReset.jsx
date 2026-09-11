import { useContext } from 'react'
import Button from '../components/Button'
import '../styles/InventoryReset.css'
import InventoryContext from '../contexts/InventoryContext'
import UpgradeContext from '../contexts/UpgradeContext'
const InventoryReset = () => {

    const { items, setItems } = useContext(InventoryContext);
    const { handleEndUpgrade } = useContext(UpgradeContext);

    if (!items || items.length < 1) return;

    const handleClick = () => {
        handleEndUpgrade();
        setItems([]);
    }

    return (
        <Button className='inventory-reset button' onClick={handleClick} title="reset" data-drop-block>
            <img src='/icons/reset_icon.svg' />
        </Button>
    )
}

export default InventoryReset