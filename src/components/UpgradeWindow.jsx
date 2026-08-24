import React, { useContext, useState } from 'react'
import '../styles/UpgradeWindow.css'
import Tooltip from './Tooltip'
import TooltipContent from './TooltipContent'
import Window from './Window'
import LocaleContext from '../contexts/LocaleContext';
import { itemsDB } from '../data/itemsDB'
import { getUpgradeRequirements } from '../utils/upgrade'

const UpgradeWindow = ({ itemToUpgrade, onClose, onSubmit }) => {

    const { translate } = useContext(LocaleContext);
    const nextItemId = itemToUpgrade.item['next_item_id']
    if (nextItemId == null) return;
    const nextItem = itemsDB.find(item => item.id === nextItemId)
    const nextItemInstance = { ...itemToUpgrade, item: nextItem }

    const upgradeRequirements = getUpgradeRequirements(nextItem)

    const [startUpgrade, setStartUpgrade] = useState(null);
    const handleStartUpgrade = () => {
        setStartUpgrade(true);
    }
    const handleClose = () => {
        setStartUpgrade(false)
        onClose();
    }

    const handleUprade = () => {
        onSubmit();
        onClose();
    }

    return (

        <div className='upgrade-window'>

            <Window title={translate('ui.upgrades')} onClose={onClose}>

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

                    <div className='cost'>{`${translate('ui.upgrade_cost')}: ${(upgradeRequirements?.cost ?? 0).toLocaleString('de-DE')}`} Yang</div>
                </div>
                <div className='buttons'>
                    <button onClick={handleStartUpgrade}>OK</button>
                    <button onClick={handleClose}>{translate('ui.cancel')}</button>
                </div>
            </Window>

            {startUpgrade &&
                <div className='confirm-upgrade-modal'>
                    <Window >

                        <span>{translate('ui.upgrade_warning')}</span>
                        <span>{translate('ui.upgrade_continue')}</span>
                        <div className='buttons'>
                            <button onClick={handleUprade}>{translate('ui.yes')}</button>
                            <button onClick={handleClose}>{translate('ui.no')}</button>
                        </div>

                    </Window>
                </div>
            }
        </div >

    )
}

export default UpgradeWindow