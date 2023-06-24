export const getContrastColor = (hexColor) => {
    // Renk değerlerini ayırma
    var r = parseInt(hexColor.substr(1, 2), 16);
    var g = parseInt(hexColor.substr(3, 2), 16);
    var b = parseInt(hexColor.substr(5, 2), 16);

    // Renk parlaklığını hesaplama
    var brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Eşik değeri belirleme
    var threshold = 128;

    // Renk parlaklığına göre yazı rengini belirleme
    if (brightness > threshold) {
        return "#000000"; // Siyah
    } else {
        return "#FFFFFF"; // Beyaz
    }
}
