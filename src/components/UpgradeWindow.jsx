import React, { useContext } from 'react'
import '../styles/UpgradeWindow.css'
import Tooltip from './Tooltip'
import TooltipContent from './TooltipContent'
import Window from './Window'
import LocaleContext from '../contexts/LocaleContext';
import { itemsDB } from '../data/itemsDB'
import { getUpgradeRequirements } from '../utils/upgrade'

const UpgradeWindow = ({ itemToUpgrade, onClose }) => {

    const { translate } = useContext(LocaleContext);
    const nextItemId = itemToUpgrade.item['next_item_id']
    const nextItem = itemsDB.find(item => item.id === nextItemId)
    const nextItemInstance = { ...itemToUpgrade, item: nextItem }

    const upgradeRequirements = getUpgradeRequirements(nextItem)
    console.log(upgradeRequirements)



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
                    <div className='materials'>
                        {upgradeRequirements.materials.map(material => (
                            <div className='material'>
                                <img className='material-icon' src={`/items/materials/${material.id}.png`} />
                                <Tooltip isStatic={true}>Ogon Węża+ x 01</Tooltip>
                            </div>
                        ))}
                    </div>
                </div>
            </Window>
        </div >

    )
}

export default UpgradeWindow