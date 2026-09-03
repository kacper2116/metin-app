import React from 'react'
import '../styles/Window.css'
import closeButtonImg from '../assets/close-button.png'
import Button from './Button'
const Window = ({ children, title, onClose, onSubmit }) => {


    return (
        <div className='window'>
            {title &&
                <div className='ui-container'>
                    <span className='window-title'>{title}</span>
                    <Button className='close-button' onClick={onClose}>
                        <img src={closeButtonImg} />
                    </Button>
                </div>
            }

            <div className='window-content-container'>
                <div className='window-content'> {children}</div>
            </div>
        </div>
    )
}

export default Window