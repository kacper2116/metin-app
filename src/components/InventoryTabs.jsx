import React from 'react'

const InventoryTabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="tabs">
            <button className={`tab ${activeTab === 0 && 'tab-active'}`} onClick={() => setActiveTab(0)}>I</button>
            <button className={`tab ${activeTab === 1 && 'tab-active'}`} onClick={() => setActiveTab(1)}>II</button>
        </div>
    )
}

export default InventoryTabs