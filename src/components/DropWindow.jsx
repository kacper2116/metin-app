import { useContext } from 'react'
import Window from './Window';
import Button from './Button';
import LocaleContext from '../contexts/LocaleContext';
import { getItemName } from '../utils/item';


const DropWindow = (props) => {

    const { translate } = useContext(LocaleContext)
    const { item, onConfirm, onCancel } = props;

    let itemDisplayName = null;

    if (item) {
        itemDisplayName = item?.plus != null ? translate(`items.${getItemName(item)}`) + '+' + item.plus : translate(`items.${getItemName(item)}`);
    }

    return (
        <div className="drop-window" data-drop-block>
            <Window>
                <span>{translate('ui.drop_warning')}{itemDisplayName}?</span>

                <div className="buttons">
                    <Button className='button' onClick={onConfirm}>{translate('ui.yes')}</Button>
                    <Button className='button' onClick={onCancel}>{translate('ui.no')}</Button>
                </div>

            </Window>
        </div>


    )
}


export default DropWindow