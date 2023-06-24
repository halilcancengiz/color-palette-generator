import { calculateNewColorValue } from "./calculateNewColorValue";
import { rgbToHex } from "./rgbToHex";

export const calculateVariation = (color, variation) => {
    const [r, g, b] = color.match(/\d+/g);
    const newRed = calculateNewColorValue(Number(r), variation);
    const newGreen = calculateNewColorValue(Number(g), variation);
    const newBlue = calculateNewColorValue(Number(b), variation);
    return rgbToHex(newRed, newGreen, newBlue);
};