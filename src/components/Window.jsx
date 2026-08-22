import React from 'react'
import '../styles/Window.css'
import closeButton from '../assets/close-button.png'
const Window = ({ children, title, onClose }) => {


    return (
        <div className='window'>
            <div className='ui-container'>
                <span className='window-title'>{title}</span>
                <button className='close-button' onClick={onClose}>
                    <img src={closeButton} />
                </button>
            </div>

            <div className='window-content-container'>
                <div className='window-content'> {children}</div>
            </div>
        </div>
    )
}

export default Window