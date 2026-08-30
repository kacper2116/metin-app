
import '../styles/TooltipContent.css'
import { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext'
import { getItemName } from '../utils/item';

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
        required_level: {
            format: value => `${translate('stats.required_level')}: ${value}`
        },

        attack: {
            format: value => `${translate('stats.attack')}: ${value}`
        },

        magical_attack: {
            format: value => `${translate('stats.magical_attack')}: ${value}`
        },

        attack_speed: {
            format: value => `${translate('stats.attack_speed')} +${value}%`
        },

        defence: {
            format: value => `${translate('stats.defence')} ${value}`
        },

        movement_speed: {
            format: value => `${translate('stats.movement_speed')} ${value}%`
        },

        magic_resistance: {
            format: value => `${translate('stats.magic_resistance')} ${value}%`
        },

        max_hp: {
            format: value => `${translate('stats.max_hp')} +${value}`
        },

        strong_against_half_humans: {
            format: value => `${translate('stats.strong_against_half_humans')} +${value}%`
        },

        strong_against_monsters: {
            format: value => `${translate('stats.strong_against_monsters')} +${value}%`
        },

        exp_bonus: {
            format: value => `${translate('stats.exp_bonus')} ${value}%`
        },

        casting_speed: {
            format: value => `${translate('stats.casting_speed')} +${value}%`
        },

        defence_against_warrior: {
            format: value => `${translate('stats.defence_against_warrior')} ${value}%`
        },

        defence_against_ninja: {
            format: value => `${translate('stats.defence_against_ninja')} ${value}%`
        },

        defence_against_sura: {
            format: value => `${translate('stats.defence_against_sura')} ${value}%`
        },

        defence_against_shaman: {
            format: value => `${translate('stats.defence_against_shaman')} ${value}%`
        },

        chance_to_block_attack: {
            format: value => `${translate('stats.chance_to_block_attack')} ${value}%`
        },

        dexterity: {
            format: value => `${translate('stats.dexterity')} +${value}`
        },

        strength: {
            format: value => `${translate('stats.strength')} +${value}`
        },

        vitality: {
            format: value => `${translate('stats.vitality')} +${value}`
        },

        intelligence: {
            format: value => `${translate('stats.intelligence')} +${value}`
        },

        max_sp: {
            format: value => `${translate('stats.max_sp')} +${value}`
        },

        sp_regeneration: {
            format: value => `${translate('stats.sp_regeneration')} +${value}%`
        },

        hp_regeneration: {
            format: value => `${translate('stats.hp_regeneration')} +${value}%`
        },

        attack_value: {
            format: value => `${translate('stats.attack_value')} +${value}`
        },

        critical_hit_chance: {
            format: value => `${translate('stats.critical_hit_chance')} +${value}%`
        },
        piercing_hit_chance: {
            format: value => `${translate('stats.piercing_hit_chance')} +${value}%`
        },
        max_endurance: {
            format: value => `${translate('stats.max_endurance')} +${value}`
        },

        poison_resistance: {
            format: value => `${translate('stats.poison_resistance')} ${value}%`
        },

        restore_sp: {
            format: value => `${value}% ${translate('stats.restore_sp')}`
        },

        restore_hp: {
            format: value => `${value}% ${translate('stats.restore_hp')}`
        },
        fire_resistance: {
            format: value => `${translate('stats.fire_resistance')} ${value}%`
        }, lightning_resistance: {
            format: value => `${translate('stats.lightning_resistance')} ${value}%`
        }, wind_resistance: {
            format: value => `${translate('stats.wind_resistance')} ${value}%`
        }, arrow_defence: {
            format: value => `${translate('stats.arrow_defence')} ${value}%`
        }, chance_to_avoid_arrows: {
            format: value => `${translate('stats.chance_to_avoid_arrows')} ${value}%`
        }, defence_bonus: {
            format: value => `${translate('stats.defence_bonus')} +${value}`
        },
        rob_sp: {
            format: value => `${translate('stats.rob_sp')} ${value}%`
        },
        avg_dmg: { format: value => `${translate('stats.avg_dmg')} ${value}%` },
        skill_dmg: { format: value => `${translate('stats.skill_dmg')} ${value}%` }
    };



    const formatStatValue = (value) => {

        if (typeof value !== 'object' || value === null) return value;

        if (Object.hasOwn(value, 'min') && Object.hasOwn(value, 'max')) return `${value.min} - ${value.max}`;
    }

    const formatStat = (name, value) => {

        const stat = statsLabels[name];

        if (!stat) return '';
        const statValue = formatStatValue(value);

        return stat.format(statValue);

    }

    const itemDisplayName = item.plus != null ? translate(`items.${getItemName(item)}`) + '+' + item.plus : translate(`items.${getItemName(item)}`);

    return (


        <div>
            <div className='tooltip-name'>{itemDisplayName}</div>
            {item.required_level && <div className='tooltip-level'>{formatStat("required_level", item.required_level)}</div>}
            {item.stats &&
                <div className='tooltip-stats'>
                    {Object.entries(item.stats).map(([name, value]) => (
                        value !== 0 && (
                            <div key={name} className={typeof value !== 'object' && value < 0 ? 'tooltip-stat--negative' : 'tooltip-stat'}>{formatStat(name, value)}</div>
                        )
                    ))}</div>
            }

            {item.description &&
                <div className='tooltip-description'>
                    {item.description}
                </div>
            }
            {itemInstance.bonuses &&
                <div className='tooltip-bonuses'>
                    {Object.entries(itemInstance.bonuses).map(([name, value]) => (
                        value !== 0 && (
                            <div key={name} className={typeof value !== 'object' && value < 0 ? 'tooltip-bonus--negative' : 'tooltip-bonus'}>{formatStat(name, value)}</div>
                        )
                    ))}
                </div>
            }
            {wearableItemTypes.includes(item.type) && <div className="tooltip-wearable">[ {translate("stats.wearable")} ]</div>}
            {item.profession && (
                <div className="tooltip-professions">
                    {item.profession.map(prof => (
                        <span key={prof} className="tooltip-profession">{translate(`common.professions.${prof}`)}</span>))}
                </div>
            )
            }
        </div>
    )
}

export default TooltipContent