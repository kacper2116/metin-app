import React, { useContext, useEffect, useRef, useState } from 'react'
import '../styles/LocaleSwitch.css'
import LocaleContext from '../contexts/LocaleContext'
import Button from '../components/Button'
const LocalesSwitch = () => {

    const { locales, locale, setLocale } = useContext(LocaleContext);
    const [showLang, setShowLang] = useState(false);
    const switchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            switchRef.current && !switchRef.current.contains(e.target) && setShowLang(false);
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSwitchLang = (locale) => {
        setLocale(locale)
        setShowLang(false);
    }

    return (
        <div className='locale-switch' ref={switchRef}>

            <Button className='button' onClick={() => setShowLang(prev => !prev)}>
                <img className='locale-icon' width={20} src={`/icons/${locale}_icon.png`} ></img>
            </Button>

            {showLang &&

                locales.map(lc =>
                    lc !== locale &&
                    <Button className='button' onClick={() => handleSwitchLang(lc)}>
                        < img className='locale-icon' width={20} src={`/icons/${lc}_icon.png`}  ></img>
                    </Button>
                )
            }

        </div >
    )
}

export default LocalesSwitch