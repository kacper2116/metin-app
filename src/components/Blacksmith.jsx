import '../styles/Blacksmith.css'
import blacksmithImg from '../assets/blacksmith.png'
import { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext';

const Blacksmith = () => {
    const { translate } = useContext(LocaleContext);

    return (
        <div className='blacksmith'>
            <span className='blacksmith-nickname'>{translate('ui.blacksmith')}</span>
            <img className='blacksmith-img' src={blacksmithImg}></img>
        </div>
    )
}

export default Blacksmith