import { forwardRef, useContext, useLayoutEffect, useRef, useState } from 'react'
import '../styles/Tooltip.css'
import MouseContext from '../contexts/MouseContext'

const Tooltip = ({ children, isStatic }) => {

    const tooltipRef = useRef(null)
    const [tooltipSize, setTooltipSize] = useState(null)
    const mousePosition = useContext(MouseContext);

    useLayoutEffect(() => {
        const rect = tooltipRef.current.getBoundingClientRect();
        setTooltipSize({ width: rect.width, height: rect.height });

    }, [children])

    const offset = 50

    const style = isStatic ? undefined : tooltipSize
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

        <div className={`tooltip ${isStatic && 'tooltip-static'}`} ref={tooltipRef}
            style={style}>
            <div className='bar top'>
                <div className='line'>
                    <div className='corner'></div>
                    <div className='empty lt1 border-right border-bottom '></div>
                    <div className='long border-top'></div>
                    <div className='empty rt1 border-left border-bottom'></div>
                    <div className='corner'></div>
                </div>
                <div className='line'>
                    <div className='empty lt2 border-bottom border-right '></div>
                    <div className='long'></div>
                    <div className='empty rt2 border-left border-bottom'></div>
                </div>
            </div>
            <div className='tooltip-content'>{children}</div>
            <div className='bar bottom'>
                <div className='line'>
                    <div className='corner'></div>
                    <div className='empty lt1 border-right border-bottom '></div>
                    <div className='long border-top'></div>
                    <div className='empty rt1 border-left border-bottom'></div>
                    <div className='corner'></div>
                </div>
                <div className='line'>
                    <div className='empty lt2 border-bottom border-right '></div>
                    <div className='long'></div>
                    <div className='empty rt2 border-left border-bottom'></div>
                </div>
            </div>
        </div>
    )
}


export default Tooltip