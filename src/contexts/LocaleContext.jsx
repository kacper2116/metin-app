import React, { createContext, useState } from 'react'
import itemsEN from '../locales/en/items.json'
import filtersEN from '../locales/en/filters.json'
import statsEN from '../locales/en/stats.json'
import uiEN from '../locales/en/ui.json'
import commonEN from '../locales/en/common.json'

import itemsPL from '../locales/pl/items.json'
import filtersPL from '../locales/pl/filters.json'
import statsPL from '../locales/pl/stats.json'
import uiPL from '../locales/pl/ui.json'
import commonPL from '../locales/pl/common.json'


const locales = {
    en: {
        common: commonEN,
        items: itemsEN,
        filters: filtersEN,
        stats: statsEN,
        ui: uiEN
    },
    pl: {
        common: commonPL,
        items: itemsPL,
        filters: filtersPL,
        stats: statsPL,
        ui: uiPL
    }
}
const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
    const [locale, setLocale] = useState('en');

    const translate = (path) => {
        const keys = path.split('.');
        let value = locales[locale];
        console.log(locales[locale])

        for (const key of keys) {
            value = value?.[key];
        }

        return value ?? path;
    }

    return (
        <LocaleContext.Provider value={{ locale, setLocale, translate }}>
            {children}
        </LocaleContext.Provider>
    )
}

export default LocaleContext