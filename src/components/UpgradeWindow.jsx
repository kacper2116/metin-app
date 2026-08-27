import React, { useContext, useState } from 'react'
import '../styles/UpgradeWindow.css'
import Tooltip from './Tooltip'
import TooltipContent from './TooltipContent'
import Window from './Window'
import LocaleContext from '../contexts/LocaleContext';
import { itemsDB } from '../data/itemsDB'
import { getUpgradeRequirements } from '../utils/upgrade'
import UpgradeContext from '../contexts/UpgradeContext'

const UpgradeWindow = ({ itemInstance }) => {

    const nextItemId = itemInstance?.item['next_item_id']
    if (nextItemId == null) return;
    const { translate } = useContext(LocaleContext);
    const { handleEndUpgrade, handleUpgrade, chance, result } = useContext(UpgradeContext);
    const [showConfirmWindow, setShowConfirmWindow] = useState(false);
    const nextItem = itemsDB.find(item => item.id === nextItemId)
    const nextItemInstance = { ...itemInstance, item: nextItem }
    const upgradeRequirements = getUpgradeRequirements(nextItem)

    const handleConfirmUpgrade = () => {
        setShowConfirmWindow(false);
        handleUpgrade();
    }

    return (

        <div>
            {!result ?
                <div className='upgrade-window'>

                    <Window title={translate('ui.upgrades')} onClose={handleEndUpgrade} >

                        <div className='item-info'>
                            <div>
                                <img className='item-thumbnail' src={nextItem.img}></img>
                            </div>
                            <Tooltip isStatic={true}>
                                <TooltipContent itemInstance={nextItemInstance} />
                            </Tooltip>
                        </div>
                        <div className='requirements'>
                            {upgradeRequirements?.materials.length > 0 &&
                                <div className='materials'>
                                    {upgradeRequirements.materials.map(material => (
                                        <div className='material'>
                                            <img className='material-icon' src={`/items/materials/${material.id}.png`} />
                                            <Tooltip isStatic={true}>{`${material.name} x ${String(material.count).padStart(2, '0')}`}</Tooltip>
                                        </div>
                                    ))}
                                </div>
                            }

                            {chance &&
                                <div className='upgrade-chance'>{`${translate('ui.upgrade_chance')} ${chance}%`}</div>
                            }

                            <div className='upgrade-cost'>{`${translate('ui.upgrade_cost')}: ${(upgradeRequirements?.cost ?? 0).toLocaleString('de-DE')}`} Yang</div>
                        </div>
                        <div className='buttons'>
                            <button onClick={() => setShowConfirmWindow(true)} >OK</button>
                            <button onClick={handleEndUpgrade} >{translate('ui.cancel')}</button>
                        </div>
                    </Window>

                    {showConfirmWindow &&
                        <div className='confirm-upgrade-modal'>
                            <Window >

                                <span>{translate('ui.upgrade_warning')}</span>
                                <span>{translate('ui.upgrade_continue')}</span>
                                <div className='buttons'>
                                    <button onClick={handleConfirmUpgrade} >{translate('ui.yes')}</button>
                                    <button onClick={() => setShowConfirmWindow(false)}>{translate('ui.no')}</button>
                                </div>

                            </Window>
                        </div>
                    }
                </div >
                :
                <div className='upgrade-result-window'>
                    <Window>
                        <div className='upgrade-result'>{result === 'success' ? translate('ui.upgrade_success') : translate('ui.upgrade_failure')}</div>
                        <button onClick={handleEndUpgrade}>Ok</button>
                    </Window>
                </div>
            }


        </div>

    )
}

export default UpgradeWindow