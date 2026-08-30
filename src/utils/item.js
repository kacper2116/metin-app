export const hasAvg = (item) => {
    const avgLevels = [30, 75];
    return avgLevels.includes(item.required_level);
}