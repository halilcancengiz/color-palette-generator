import React, { useState, useEffect } from 'react'
import { VscCopy, SiCreatereactapp } from "../assets/icons";
import { toast } from 'react-toastify';

const GenerateColor = () => {
    const [mainColor, setMainColor] = useState({
        red: "",
        green: "",
        blue: ""
    });
    const [variations, setVariations] = useState({
        first: "",
        second: "",
        third: "",
        fourth: ""
    });

    const randomColor = () => {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        const color = `rgb(${red}, ${green}, ${blue})`;
        setMainColor({
            red: red,
            green: green,
            blue: blue
        });
        setVariations({
            first: calculateVariation(color, 0.2),
            second: calculateVariation(color, 0.4),
            third: calculateVariation(color, 0.6),
            fourth: calculateVariation(color, 0.8)
        });
    };

    const calculateNewColorValue = (colorValue, variation) => {
        const min = Math.max(0, colorValue - Math.floor(colorValue * variation));
        const max = Math.min(255, colorValue + Math.floor(colorValue * variation));
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const calculateVariation = (color, variation) => {
        const [r, g, b] = color.match(/\d+/g);
        const newRed = calculateNewColorValue(Number(r), variation);
        const newGreen = calculateNewColorValue(Number(g), variation);
        const newBlue = calculateNewColorValue(Number(b), variation);
        return rgbToHex(newRed, newGreen, newBlue);
    };

    const rgbToHex = (r, g, b) => {
        const redHex = r.toString(16).padStart(2, "0");
        const greenHex = g.toString(16).padStart(2, "0");
        const blueHex = b.toString(16).padStart(2, "0");
        return `#${redHex}${greenHex}${blueHex}`;
    };

    const copyToClipboard = (color) => {
        try {
            const el = document.createElement("textarea");
            el.value = color;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            toast.success(`Color code copied successfully: ${color}`, {
                theme: "dark",
                autoClose: 1000
            });
        } catch (error) {
            console.error("An error occurred while copying the color code:", error);
            toast.error("Error copying the color code. Please try again.", {
                theme: "dark",
                autoClose: 3000
            });
        }
    };

    useEffect(() => {
        randomColor();
    }, []);

    return (
        <div className="flex flex-col gap-1 h-screen">
            <div style={{ background: `linear-gradient(to right, rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}), ${variations.fourth})` }} className="h-16 text-white flex items-center justify-center" onClick={randomColor}>
                <button className='bg-dark flex items-center justfiy-center py-2 px-4 rounded-md text-sm'>
                    <SiCreatereactapp size={18} />
                    <span className="ml-2">Generate</span>
                </button>

            </div>
            <div className="grid md:grid-cols-5 grow gap-1 text-sm">
                <div className="group flex items-center justify-center" style={{ backgroundColor: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})` }}>
                    <div className="hidden items-center gap-2 py-2 px-4 text-white rounded-md cursor-pointer bg-dark group-hover:flex" onClick={() => copyToClipboard(rgbToHex(mainColor.red, mainColor.green, mainColor.blue))}>
                        <VscCopy size={20} />
                        <span>{rgbToHex(mainColor.red, mainColor.green, mainColor.blue)}</span>
                    </div>
                </div>
                <div className="group flex items-center justify-center" style={{ background: variations.first }}>
                    <div className="hidden items-center gap-2 py-2 px-4 text-white rounded-md cursor-pointer bg-dark group-hover:flex" onClick={() => copyToClipboard(variations.first)}>
                        <VscCopy size={20} />
                        <span>{variations.first}</span>
                    </div>
                </div>
                <div className="group flex items-center justify-center" style={{ background: variations.second }}>
                    <div className="hidden items-center gap-2 py-2 px-4 text-white rounded-md cursor-pointer bg-dark group-hover:flex" onClick={() => copyToClipboard(variations.second)}>
                        <VscCopy size={20} />
                        <span>{variations.second}</span>
                    </div>
                </div>
                <div className="group flex items-center justify-center" style={{ background: variations.third }}>
                    <div className="hidden items-center gap-2 py-2 px-4 text-white rounded-md cursor-pointer bg-dark group-hover:flex" onClick={() => copyToClipboard(variations.third)}>
                        <VscCopy size={20} />
                        <span>{variations.third}</span>
                    </div>
                </div>
                <div className="group flex items-center justify-center" style={{ background: variations.fourth }}>
                    <div className="hidden items-center gap-2 py-2 px-4 text-white rounded-md cursor-pointer bg-dark group-hover:flex" onClick={() => copyToClipboard(variations.fourth)}>
                        <VscCopy size={20} />
                        <span>{variations.fourth}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GenerateColor