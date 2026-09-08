import { useContext, useEffect, useState } from 'react'
import '../styles/ItemFilter.css';
import { itemsDB } from '../data/itemsDB';
import LocaleContext from '../contexts/LocaleContext'
import Button from './Button';
import { playSound } from '../utils/audio';
const ItemFilter = ({ filter, setFilter, setActiveTab }) => {

    const { translate } = useContext(LocaleContext)

    const filterOptions = {
        type: [
            "weapon",
            "armour",
            "shield",
            "helmet",
            "earrings",
            "necklace",
            "bracelet",
            "shoes",
            "special",
        ],
        plus: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        profession: ["warrior", "ninja", "sura", "shaman"]
    }

    const weaponTypes = {
        warrior: ["sword", "two_handed"],
        ninja: ["sword", "dagger", "bow"],
        sura: ["sword", "blade"],
        shaman: ["fan", "bell"]
    }

    const handleSetFilter = (e) => {
        const prop = e.target.name;
        let value = e.target.value

        if (prop === 'plus') value = Number(value);

        setFilter(prev => ({
            ...prev,
            [prop]: prev[prop] === value ? null : value,
        }))
    }

    const handleChangeSelect = (e) => {
        playSound('click_button')
        handleSetFilter(e);
    }

    useEffect(() => {

        if (filter.subtype === null) return;
        setFilter(prev => ({
            ...prev,
            subtype: null
        }))
    }, [filter.profession, filter.type])

    useEffect(() => {
        if (filter.type !== 'weapon') return;

        const defaultSubtype = weaponTypes[filter.profession]?.[0]
        if (!defaultSubtype) return;

        setFilter(prev => (
            {
                ...prev,
                subtype: defaultSubtype
            })
        )

    }, [filter.profession, filter.type])

    return (
        <div className='filter-options'>
            <div className='filter-profession' >
                {filterOptions.profession.map(profession =>
                    <Button
                        key={profession}
                        name="profession"
                        value={profession}
                        className={`button filter-button ${filter.profession === profession ? 'active' : ''}`}
                        onClick={(e) => filter.profession !== profession && handleSetFilter(e)}
                    >{translate(`common.professions.${profession}`)}</Button>
                )}
            </div>

            <select className='filter-type' onChange={handleChangeSelect} value={filter.type} name="type">
                {filterOptions.type.map(type =>
                    <option value={type} key={type}>{translate(`filters.type.${type}`)}</option>
                )}
            </select>
            {filter.type !== 'special' &&
                <select className='filter-plus' onChange={handleChangeSelect} value={filter.plus} name='plus'>
                    {filterOptions.plus.map(plus =>
                        <option key={plus} value={plus}>{'+' + plus}</option>
                    )}
                </select>

            }

            {filter.type === 'weapon' &&
                <div className='filter-subtype'>
                    {weaponTypes[filter.profession].map(subtype =>
                        <Button
                            key={subtype}
                            name='subtype'
                            value={subtype}
                            className={`button filter-button ${filter.subtype === subtype ? 'active' : ''}`}
                            onClick={handleSetFilter}
                        >{translate(`filters.weapon_type.${subtype}`)}</Button>
                    )}
                </div>
            }


        </div>
    )
}

export default ItemFilter