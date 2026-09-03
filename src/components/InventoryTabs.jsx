import '../styles/InventoryTabs.css'
import { integerToRoman } from '../utils/ui';
import Button from './Button';
const InventoryTabs = (props) => {

    const { activeTab, setActiveTab, tabCount } = props;

    return (
        <div className="tabs">
            {Array.from({ length: tabCount }).map((_, index) => (
                <Button key={`tab-${index}`} className={`tab ${activeTab === index && 'active'}`} onMouseDown={() => setActiveTab(index)} isActive={activeTab === index}>{integerToRoman(index + 1)}</Button>
            ))}
        </div>
    )
}

export default InventoryTabs