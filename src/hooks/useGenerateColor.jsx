import { useState } from 'react';
import { calculateVariation } from '../utils/calculateVariation';

const useGenerateColor = () => {
  const [mainColor, setMainColor] = useState({
    red: '',
    green: '',
    blue: ''
  });
  const [variations, setVariations] = useState({
    first: '',
    second: '',
    third: '',
    fourth: ''
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

  return {
    randomColor,
    mainColor,
    variations
  };
};

export default useGenerateColor;