import { createContext, useEffect, useState } from 'react'

const MouseContext = createContext();

export const MouseProvider = ({ children }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updatePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", updatePosition);
        return () => {
            window.removeEventListener("mousemove", updatePosition);
        };
    }, []);

    return (
        <MouseContext.Provider value={mousePosition}>
            {children}
        </MouseContext.Provider>
    )
}

export default MouseContext