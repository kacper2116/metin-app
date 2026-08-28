import '../styles/InventoryTabs.css'
import { integerToRoman } from '../utils/ui';
const InventoryTabs = (props) => {

    const { activeTab, setActiveTab, tabCount } = props;

    return (
        <div className="tabs">
            {Array.from({ length: tabCount }).map((_, index) => (
                <button key={`tab-${index}`} className={`tab ${activeTab === index && 'active'}`} onMouseDown={() => setActiveTab(index)}>{integerToRoman(index + 1)}</button>
            ))}
        </div>
    )
}

export default InventoryTabs