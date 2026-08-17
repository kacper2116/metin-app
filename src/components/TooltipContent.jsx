
import '../styles/TooltipContent.css'
import { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext'

const TooltipContent = ({ itemInstance }) => {

    const item = itemInstance.item;

    const { translate } = useContext(LocaleContext)

    const wearableItemTypes = [
        'weapon',
        'armour',
        'shield',
        'helmet',
        'bracelet',
        'earrings',
        'necklace',
        'shoes'
    ]

    const statsLabels = {
        required_level: { label: translate('stats.required_level') + ': ', unit: null },
        attack: { label: translate('stats.attack') + ': ', unit: null },
        magical_attack: { label: translate('stats.magical_attack') + ': ', unit: null },
        attack_speed: { label: translate('stats.attack_speed') + ' +', unit: '%' },
        defence: { label: translate('stats.defence') + ' ', unit: null },
        movement_speed: { label: translate('stats.movement_speed') + ' ', unit: '%' },
        magic_resistance: { label: translate('stats.magic_resistance') + ': ', unit: '%' },
        max_hp: { label: translate('stats.max_hp') + ' +', unit: null },
        strong_against_half_humans: { label: translate('stats.strong_against_half_humans') + ' +', unit: '%' },
        strong_against_monsters: { label: translate('stats.strong_against_monsters') + ' +', unit: '%' },
        exp_bonus: { label: translate('stats.exp_bonus') + ': ', unit: '%' },
        casting_speed: { label: translate('stats.casting_speed') + ' +', unit: '%' },
        defence_against_warrior: { label: translate('stats.defence_against_warrior') + ': ', unit: '%' },
        defence_against_ninja: { label: translate('stats.defence_against_ninja') + ': ', unit: '%' },
        defence_against_sura: { label: translate('stats.defence_against_sura') + ': ', unit: '%' },
        defence_against_shaman: { label: translate('stats.defence_against_shaman') + ': ', unit: '%' },
        chance_to_block_attack: { label: translate('stats.chance_to_block_attack') + ' ', unit: '%' },
        dexterity: { label: translate('stats.dexterity') + ' +', unit: null },
        strength: { label: translate('stats.strength') + ' +', unit: null },
        vitality: { label: translate('stats.vitality') + ' +', unit: null },
        intelligence: { label: translate('stats.intelligence') + ' +', unit: null },
        max_sp: { label: translate('stats.max_sp') + ' +', unit: null },
        sp_regeneration: { label: translate('stats.sp_regeneration') + ' +', unit: '%' },
        hp_regeneration: { label: translate('stats.hp_regeneration') + ' +', unit: '%' },
        attack_value: { label: translate('stats.attack_value') + ' +', unit: null },
        critical_hit_chance: { label: translate('stats.critical_hit_chance') + ' +', unit: '%' },
    }


    const formatStatValue = (value) => {

        if (typeof value !== 'object' || value === null) return value;

        if (Object.hasOwn(value, 'min') && Object.hasOwn(value, 'max')) return `${value.min} - ${value.max}`;
    }

    const formatStat = (name, value) => {

        const stat = statsLabels[name];

        if (!stat) return '';
        const statValue = formatStatValue(value);

        return `${stat.label}${statValue}${stat.unit ?? ''}`;
    }

    const itemDisplayName = translate(`items.${item.name.split('+')[0]}`) + '+' + item.plus;

    return (


        <div className='tooltip-content'>
            <div className='tooltip-name'>{itemDisplayName}</div>
            {item.required_level && <div className='tooltip-level'>{formatStat("required_level", item.required_level)}</div>}
            {item.stats &&
                <div className='tooltip-stats'>
                    {Object.entries(item.stats).map(([name, value]) => (

                        <div key={name} className={typeof value !== 'object' && value < 0 ? 'tooltip-stat--negative' : 'tooltip-stat'}>{formatStat(name, value)}</div>
                    ))}</div>
            }
            {wearableItemTypes.includes(item.type) && <div className="tooltip-wearable">[ {translate("stats.wearable")} ]</div>}
            {item.profession && (
                <div className="tooltip-professions">
                    {item.profession.map(prof => (
                        <span className="tooltip-profession">{translate(`common.professions.${prof}`)}</span>))}
                </div>
            )
            }
        </div>
    )
}

export default TooltipContent