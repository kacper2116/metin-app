import { createContext, useRef, useState } from "react"

const WindowContext = createContext();

export const WindowProvider = ({ children }) => {

    /*  const [activeWindow, setActiveWindow] = useState(null); */
    const activeWindow = useRef(null);


    return (
        <WindowContext.Provider value={{ activeWindow }}>
            {children}
        </WindowContext.Provider>
    )
}

export default WindowContext