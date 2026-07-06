import React from 'react'
import './Tooltip.css'

const Tooltip = ({ children }) => {
    return (
        <div className='tooltip'>
            <span className='top-bar'></span>

            <span className='corner lt'></span>
            <span className='line lt'></span>

            <span className='corner rt'></span>
            <span className='line rt'></span>

            <span className='corner lb'></span>
            <span className='line lb'></span>

            <span className='corner rb'></span>
            <span className='line rb'></span>

            <span className='bottom-bar'>
            </span>

            <div className='tooltip-content'>{children}</div>

        </div>
    )
}

export default Tooltip