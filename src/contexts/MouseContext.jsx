import { createContext, useEffect, useState } from 'react'

const MouseContext = createContext();

export const MouseProvider = ({ children }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updatePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("pointermove", updatePosition);
        window.addEventListener("pointerdown", updatePosition);
        return () => {
            window.removeEventListener("pointermove", updatePosition);
            window.removeEventListener("pointerdown", updatePosition);
        };
    }, []);

    return (
        <MouseContext.Provider value={mousePosition}>
            {children}
        </MouseContext.Provider>
    )
}

export default MouseContext