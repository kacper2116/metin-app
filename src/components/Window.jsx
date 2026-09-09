import React, { useContext } from 'react'
import '../styles/Window.css'
import closeButtonImg from '../assets/close-button.png'
import LocaleContext from '../contexts/LocaleContext'
import Button from './Button'
const Window = ({ children, title, onClose, onSubmit }) => {

    const { translate } = useContext(LocaleContext);

    return (
        <div className='window'>
            {title &&
                <div className='ui-container'>
                    <span className='window-title'>{title}</span>
                    <Button className='close-button' onClick={onClose} title={translate('ui.close')}>
                        <img width={32} height={32} src={closeButtonImg} />
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