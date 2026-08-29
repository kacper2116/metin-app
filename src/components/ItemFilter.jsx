import { useContext, useEffect, useState } from 'react'
import '../styles/ItemFilter.css';
import { itemsDB } from '../data/itemsDB';
import LocaleContext from '../contexts/LocaleContext'
const ItemFilter = ({ setFilteredItems, setActiveTab }) => {

    const { translate } = useContext(LocaleContext)

    const [filter, setFilter] = useState({
        type: 'weapon',
        subtype: null,
        profession: 'warrior',
        plus: 0
    });

    const filterOptions = {
        type: [
            "weapon",
            "armour",
            "shield",
            "helmet",
            "earrings",
            "necklace",
            "bracelet",
            "shoes"
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

    useEffect(() => {

        if (filter.subtype === null) return;
        setFilter(prev => ({
            ...prev,
            subtype: null
        }))
    }, [filter.profession, filter.type])



    useEffect(() => {

        const filtered = itemsDB.filter(item =>
            item.type === filter.type &&
            (!filter.subtype || item.subtype === filter.subtype) &&
            item.profession.includes(filter.profession) &&
            item.plus === filter.plus
        )

        setFilteredItems(filtered);
        setActiveTab(0);

    }, [filter])

    return (
        <div className='filter-options'>
            <div className='filter-profession' >
                {filterOptions.profession.map(profession =>
                    <button
                        key={profession}
                        name="profession"
                        value={profession}
                        className={`filter-button button-basic ${filter.profession === profession ? 'active' : ''}`}
                        onClick={(e) => filter.profession !== profession && handleSetFilter(e)}
                    >{translate(`common.professions.${profession}`)}</button>
                )}
            </div>

            <select className='filter-type' onChange={handleSetFilter} value={filter.type} name="type">
                {filterOptions.type.map(type =>
                    <option value={type} key={type}>{translate(`filters.type.${type}`)}</option>
                )}
            </select>
            <select className='filter-plus' onChange={handleSetFilter} value={filter.plus} name='plus'>
                {filterOptions.plus.map(plus =>
                    <option key={plus} value={plus}>{'+' + plus}</option>
                )}
            </select>

            {filter.type === 'weapon' &&
                <div className='filter-subtype'>
                    {weaponTypes[filter.profession].map(subtype =>
                        <button
                            key={subtype}
                            name='subtype'
                            value={subtype}
                            className={`filter-button button-basic ${filter.subtype === subtype ? 'active' : ''}`}
                            onClick={handleSetFilter}
                        >{translate(`filters.weapon_type.${subtype}`)}</button>
                    )}
                </div>
            }


        </div>
    )
}

export default ItemFilter