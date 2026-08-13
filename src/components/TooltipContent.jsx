
import '../styles/TooltipContent.css'
import en from '../locales/en.json'
import { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext'

const TooltipContent = ({ itemInstance }) => {

    const item = itemInstance.item;


    const localeContext = useContext(LocaleContext)


    const wearableItemTypes = [
        'weapon',
        'armor',
        'shield',
        'helmet',
        'bracelet',
        'earrings',
        'necklace',
        'shoes'
    ]

    const professions = {
        warrior: "Wojownik",
        ninja: "Ninja",
        sura: "Sura",
        shaman: "Szaman"

    }

    const statsLabels = {
        required_level: { label: 'Od poziomu', unit: null },
        attack: { label: "Wartość ataku", unit: null },
        magical_attack: { label: 'Wartość magicznego ataku', unit: null },
        attack_speed: { label: 'Prędkość ataku', unit: '%' },
        defense: { label: 'Obrona', unit: null },
        movement_speed: { label: 'Prędkość ruchu', unit: '%' },
    }

    const formatStatValue = (value) => {

        if (typeof value !== 'object' || value === null) return value;

        if (Object.hasOwn(value, 'min') && Object.hasOwn(value, 'max')) return `${value.min} - ${value.max}`;
    }

    const formatStat = (name, value) => {

        const stat = statsLabels[name];
        if (!stat) return '';
        const statValue = formatStatValue(value);

        return `${stat.label}: ${statValue}${stat.unit ?? ''}`;
    }

    return (
        <div className='tooltip-content'>
            <div className='tooltip-name'>{item.name}</div>
            {item.required_level && <div className='tooltip-level'>{formatStat("required_level", item.required_level)}</div>}
            {item.stats &&
                <div className='tooltip-stats'>
                    {Object.entries(item.stats).map(([name, value]) => (
                        <div key={name} className='tooltip-stat'>{formatStat(name, value)}</div>
                    ))}</div>
            }
            {wearableItemTypes.includes(item.type) && <div className="tooltip-wearable">[ Do ubrania ]</div>}
            {item.profession && (
                <div className="tooltip-professions">
                    {item.profession.map(prof => (
                        <span className="tooltip-profession">{professions[prof]}</span>))}
                </div>
            )
            }
        </div>
    )
}

export default TooltipContent