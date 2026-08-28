import React, { createContext, useState } from 'react'
import useInventory from '../hooks/useInventory';

const InventoryContext = createContext();


export const InventoryProvider = ({ children }) => {

    const inventory = useInventory();

    return (
        <InventoryContext.Provider value={inventory}>
            {children}
        </InventoryContext.Provider>
    )
}

export default InventoryContext