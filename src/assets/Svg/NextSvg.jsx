import {View, Text} from 'react-native';
import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const NextSvg = () => {
  return (
    <Svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" height={30} width={30}>
      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
      <G
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"></G>
      <G id="SVGRepo_iconCarrier">
        <Path
          d="M19 6C19 6 19.5 8 19.5 12C19.5 16 19 18 19 18M5 6C5 6 4.5 8 4.5 12C4.5 16 5 18 5 18C5 18 7 17.5 10.5 15.5C14 13.5 15 12 15 12C15 12 14 10.5 10.5 8.5C7 6.5 5 6 5 6Z"
          stroke="#fff"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"></Path>
      </G>
    </Svg>
  );
};

export default NextSvg;
