export const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min - 1)) + min;
}

export const arrEqual = (a, b) => {
    return a.length === b.length &&
        a.every((value, index) => value === b[index]);
}