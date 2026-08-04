import { createContext, useState } from 'react'
import Tooltip from '../components/Tooltip';
import TooltipContent from '../components/TooltipContent';

const TooltipContext = createContext();

export const TooltipProvider = ({ children }) => {

    const [item, setItem] = useState(null);
    const showTooltip = (item) => setItem(item);
    const hideTooltip = () => setItem(null);

    return (
        <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
            {children}
            {item && (
                <Tooltip>
                    <TooltipContent itemInstance={item} />
                </Tooltip>
            )}
        </TooltipContext.Provider>
    )

}

export default TooltipContext;