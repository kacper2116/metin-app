import React from 'react'

const InventoryTabs = (props) => {

    const { activeTab, setActiveTab, tabCount } = props;

    return (
        <div className="tabs">
            {Array.from({ length: tabCount }).map((_, index) => (
                <button key={`tab-${index}`} className={`tab ${activeTab === index && 'tab-active'}`} onClick={() => setActiveTab(index)}>{index + 1}</button>
            ))}
        </div>
    )
}

export default InventoryTabs