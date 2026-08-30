
export const hasAvg = (item) => {
    const avgLevels = [30, 75];
    return avgLevels.includes(item.required_level);
}


export const getItemName = (item) => item.plus != null ? item.name.split('+')[0] : item.name;



