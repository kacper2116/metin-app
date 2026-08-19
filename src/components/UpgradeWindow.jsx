import React from 'react'
import '../styles/UpgradeWindow.css'
import Tooltip from './Tooltip'
import TooltipContent from './TooltipContent'
import Window from './Window'

const UpgradeWindow = ({ itemToUpgrade }) => {
    console.log(itemToUpgrade)
    return (

        <div className='upgrade-window'>
            <Window>

                <div className='item-info'>
                    <div>
                        <img className='item-thumbnail' src={itemToUpgrade.item.img}></img>
                    </div>
                    <Tooltip isStatic={true}>
                        <TooltipContent itemInstance={itemToUpgrade} />
                    </Tooltip>
                </div>
            </Window>
        </div >

    )
}

export default UpgradeWindow