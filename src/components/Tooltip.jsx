import { forwardRef, useContext, useLayoutEffect, useRef, useState } from 'react'
import '../styles/Tooltip.css'
import MouseContext from '../contexts/MouseContext'

const Tooltip = ({ children }) => {

    const tooltipRef = useRef(null)
    const [tooltipSize, setTooltipSize] = useState(null)
    const mousePosition = useContext(MouseContext);

    useLayoutEffect(() => {
        const rect = tooltipRef.current.getBoundingClientRect();
        setTooltipSize({ width: rect.width, height: rect.height });

    }, [children])

    const offset = 50
    const style = tooltipSize
        ? {
            left: Math.max(
                0,
                Math.min(
                    mousePosition.x - tooltipSize.width / 2,
                    window.innerWidth - tooltipSize.width
                )
            ),

            top: Math.max(
                0,
                Math.min(
                    mousePosition.y < 550 ? mousePosition.y + offset : mousePosition.y - (tooltipSize.height + offset),
                    window.innerHeight - tooltipSize.height
                )
            )
        }
        : {
            left: mousePosition.x,
            top: mousePosition.y
        };

    return (
        <div className='tooltip' ref={tooltipRef}
            style={style}>
            <span className='top-bar'></span>

            <span className='corner lt'></span>
            <span className='line lt'></span>

            <span className='corner rt'></span>
            <span className='line rt'></span>

            <span className='corner lb'></span>
            <span className='line lb'></span>

            <span className='corner rb'></span>
            <span className='line rb'></span>

            <span className='bottom-bar'></span>

            <div className='tooltip-content'>{children}</div>
        </div>
    )
}


export default Tooltip