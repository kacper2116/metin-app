import upgradeMaterials from '../data/items/materials.json'

const upgradeFiles = import.meta.glob(
    '../data/upgrades/*-upgrades.json',
    {
        eager: true,
        import: 'default'
    }
);

const upgradeSchemes = Object.values(upgradeFiles).flat();


export const getUpgradeRequirements = (item) => {

    const upgradeScheme = upgradeSchemes.find(
        scheme => scheme.name === item['upgrade_scheme']
    )

    console.log(upgradeScheme)

    const requirements = upgradeScheme?.upgrades[item.plus] ?? null
    console.log(requirements)
    const materialsData = requirements?.materials.map(material => ({
        ...upgradeMaterials.find(item => item.id === material.id),
        count: material.count

    })) ?? [];

    return { cost: requirements?.cost ?? null, materials: materialsData }
}






