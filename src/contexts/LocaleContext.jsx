import React, { createContext, useState } from 'react'
import en from '../locales/en.json'
import pl from '../locales/pl.json'


const locales = { en, pl }
const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
    const [locale, setLocale] = useState('en');

    const translate = (path, key) => {
        const value = path.split('.').reduce((obj, part) => obj?.[part], locales[locale]);
        return value?.[key] ?? key;
    }

    return (
        <LocaleContext.Provider value={{ locale, setLocale, translate }}>
            {children}
        </LocaleContext.Provider>
    )
}

export default LocaleContext