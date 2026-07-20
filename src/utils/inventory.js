
export const isSlotEmpty = (items, page, slot, inventorySize) => {
    return !findItemBySlot(items, page, slot, inventorySize)
}

export const findItemBySlot = (items, tab, slot, inventorySize) => {

    if (!items) return false;

    const activeTabItems = items.filter(item => item.tab === tab);
    return activeTabItems.find(item => {

        for (let i = 0; i < item.item.size; i++) {
            const currentSlot = item.slot + i * inventorySize.x;
            if (currentSlot === slot) return true;
        }

        return false;
    })
}

export const getSelectedSlots = (slotIndex, itemSize, inventorySize) => {

    let slots = []
    for (let i = 0; i < itemSize; i++) {
        let currentSlot = null;
        if (i > 1) currentSlot = slotIndex - inventorySize.x;
        else currentSlot = slotIndex + i * inventorySize.x;
        slots.push(currentSlot)
    }

    let badIndex = slots.findIndex(slotIndex => slotIndex < 0 || slotIndex > inventorySize.x * inventorySize.y - 1);
    if (badIndex !== -1) {

        if (slots[badIndex] < 0) {
            slots[badIndex] = Math.max(...slots) + inventorySize.x;
        }
        if (slots[badIndex] > inventorySize.x * inventorySize.y - 1) {
            slots[badIndex] = Math.min(...slots) - inventorySize.x;
        }
    }
    const sorted = slots.sort((a, b) => a - b);
    return sorted;
}

export const getItemSlots = (item, inventorySize) => {
    const itemSize = item.item.size;
    const itemSlot = item.slot;
    const itemSlots = [];
    for (let i = 0; i < itemSize; i++) {
        const currentSlot = itemSlot + i * inventorySize.x;
        itemSlots.push(currentSlot);
    }

    return itemSlots;
}

export const canPlaceItem = (items, page, slot, item, inventorySize) => {

    for (let i = 0; i < item.size; i++) {
        const currentSlot = slot + i * inventorySize.x;

        if (currentSlot >= inventorySize.x * inventorySize.y) {
            return false;
        }
        if (!isSlotEmpty(items, page, currentSlot, inventorySize)) {
            return false;
        };
    }
    return true;
}

export const placeItemsInGrid = (items, inventorySize) => {

    const result = [];
    let currentTab = 0;

    for (const item of items) {

        let placed = false;

        for (let slot = 0; slot < inventorySize.x * inventorySize.y; slot++) {
            if (canPlaceItem(result, currentTab, slot, item, inventorySize)) {
                result.push({ item: item, tab: currentTab, slot: slot });
                placed = true;
                break;
            }
        }

        if (!placed) {
            currentTab++;
            result.push({ item: item, tab: currentTab, slot: 0 })
        }
    }

    return result;
};