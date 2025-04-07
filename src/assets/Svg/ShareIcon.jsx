import React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

const ShareIcon = () => {
  return (
    <Svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      fill="#fff"
    >
      <G clipPath="url(#clip0_15_72)">
        <Circle cx="7" cy="12" r="2" stroke="#dddddd" strokeLinejoin="round" />
        <Circle cx="17" cy="6" r="2" stroke="#dddddd" strokeLinejoin="round" />
        <Path d="M15 7L8.5 11" stroke="#dddddd" />
        <Circle cx="17" cy="18" r="2" stroke="#dddddd" strokeLinejoin="round" />
        <Path d="M8.5 13.5L15 17" stroke="#dddddd" />
      </G>
    </Svg>
  );
};

export default ShareIcon;
