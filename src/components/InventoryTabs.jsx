import React from 'react'

const InventoryTabs = ({ activeTab, setActiveTab, tabCount }) => {
    return (
        <div className="tabs">

            {Array.from({ length: tabCount }).map((_, index) => (
                <button className={`tab ${activeTab === index && 'tab-active'}`} onClick={() => setActiveTab(index)}>{index + 1}</button>
            ))}


        </div>
    )
}

export default InventoryTabs