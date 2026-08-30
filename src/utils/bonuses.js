import { gaussianRandom } from "gaussian-rng";
import { randomInt } from './math';

export const generateAvgAndSkillBonus = () => {

    const skillDmg = Math.max(-30,
        Math.min(
            Math.trunc(
                gaussianRandom({ mean: 0, stdDev: 5 }) + 0.5
            ), 30
        )
    )

    let avgDmg = 0;
    if (Math.abs(skillDmg) <= 20) {
        avgDmg = -2 * skillDmg + Math.abs(randomInt(-8, 8) + randomInt(-8, 8));
    } else {
        avgDmg = -2 * skillDmg + randomInt(1, 5);
    }

    return { avgDmg, skillDmg }
}

