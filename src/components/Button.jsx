import React from 'react'
import '../styles/Button.css'
import { playSound } from '../utils/audio'
const Button = ({ children, onClick, onMouseDown, isActive, ...props }) => {

    const handleClick = (e) => {
        if (isActive) return;
        playSound('click_button');
        onClick?.(e);

    }

    const handleMouseDown = (e) => {
        if (isActive) return;
        playSound('click_button');
        onMouseDown?.(e);
    }

    return (
        <button onClick={onClick && handleClick} onMouseDown={onMouseDown && handleMouseDown} {...props}>{children}</button>
    )
}

export default Button