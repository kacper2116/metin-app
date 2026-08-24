import upgradeMaterials from '../data/items/materials.json'

const upgradeFiles = import.meta.glob(
    '../data/upgrades/*-upgrades.json',
    {
        eager: true,
        import: 'default'
    }
);

export const getUpgradeRequirements = (item) => {

    const upgradeSchemeName = item['upgrade_scheme'];

    const category = upgradeSchemeName.split('-')[0];
    console.log(category)
    const upgradeFile = upgradeFiles[`../data/upgrades/${category}-upgrades.json`];
    console.log(upgradeFile)
    const upgradeScheme = upgradeFile.find(scheme => scheme.name === upgradeSchemeName)

    const requirements = upgradeScheme?.upgrades[item.plus] ?? null
    const materialsData = requirements.materials.map(material => ({
        ...upgradeMaterials.find(item => item.id === material.id),
        count: material.count

    }))


    return { cost: requirements.cost, materials: materialsData }
}






