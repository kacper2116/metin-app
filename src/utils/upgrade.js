import upgradeMaterials from '../data/items/materials.json'

const upgradeFiles = import.meta.glob(
    '../data/upgrades/*-upgrades.json',
    {
        eager: true,
        import: 'default'
    }
);

const getMaterialData = (materialId) => {

    const materialData = upgradeMaterials.find(material => material.id === materialId)

    return materialData;
}

export const getUpgradeRequirements = (item) => {

    const upgradeSchemeName = item['upgrade_scheme'];

    const category = upgradeSchemeName.split('-')[0];
    const upgradeFile = upgradeFiles[`../data/upgrades/${category}-upgrades.json`];

    const upgradeScheme = upgradeFile.find(scheme => scheme.name === upgradeSchemeName)

    const requirements = upgradeScheme?.upgrades[item.plus] ?? null
    return requirements
}




