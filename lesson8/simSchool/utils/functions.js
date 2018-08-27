export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle(array) {
    const clone = [...array];
    clone.sort(() => 1 - 2 * randomInt(0, 1));
    return clone;
}