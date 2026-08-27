import upgradeMaterials from '../data/items/materials.json'
import upgradeChances from '../data/upgrades/upgrade-chances.json'
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

    const requirements = upgradeScheme?.upgrades[item.plus] ?? null
    const materialsData = requirements?.materials.map(material => ({
        ...upgradeMaterials.find(item => item.id === material.id),
        count: material.count

    })) ?? [];

    return { cost: requirements?.cost ?? null, materials: materialsData }
}

export const getUpgradeChance = (item, method) => {

    const { required_level, plus } = item;


    if (method === 'base') {

        const chances = upgradeChances.base.find(tier => required_level <= tier.max_lv)?.chances ?? null;
        return chances[plus]
    }

    return upgradeFiles[method]?.[plus] ?? null;
}

export const isUpgradeSuccess = (chance) => {

    const random = Math.floor(Math.random() * 100) + 1
    return random <= chance;
}




