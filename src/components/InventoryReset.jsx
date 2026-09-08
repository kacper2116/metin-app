import React, { useContext } from 'react'
import Button from '../components/Button'
import '../styles/InventoryReset.css'
import InventoryContext from '../contexts/InventoryContext'
const InventoryReset = () => {

    const { items, setItems } = useContext(InventoryContext);

    if (!items || items.length < 1) return;

    return (
        <Button className='inventory-reset button' onClick={() => setItems([])} title="reset">
            <img src='/icons/reset_icon.svg'>
            </img></Button>

    )
}

export default InventoryReset