import React, { createContext, useContext } from 'react'
import useUpgrade from '../hooks/useUpgrade';

const UpgradeContext = createContext(null);

export const UpgradeProvider = ({ children }) => {

    const upgrade = useUpgrade();

    return (
        <UpgradeContext.Provider value={upgrade}>
            {children}
        </UpgradeContext.Provider>
    )
}


export default UpgradeContext;
