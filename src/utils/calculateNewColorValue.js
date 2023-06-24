export const calculateNewColorValue = (colorValue, variation) => {
    const min = Math.max(0, colorValue - Math.floor(colorValue * variation));
    const max = Math.min(255, colorValue + Math.floor(colorValue * variation));
    return Math.floor(Math.random() * (max - min + 1)) + min;
};