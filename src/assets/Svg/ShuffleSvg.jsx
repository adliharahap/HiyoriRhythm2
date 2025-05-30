import React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';

const ShuffleSvg = ({color, width, height}) => {
  return (
    <>
      <Svg
        fill= {color}
        width= {width}
        height= {height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <G data-name="Layer 2">
          <G data-name="shuffle">
            <Rect
              width="24"
              height="24"
              transform="rotate(180 12 12)"
              opacity="0"
            />

            <Path d="M18 9.31a1 1 0 0 0 1 1 1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-4.3a1 1 0 0 0-1 1 1 1 0 0 0 1 1h1.89L12 10.59 6.16 4.76a1 1 0 0 0-1.41 1.41L10.58 12l-6.29 6.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L18 7.42z" />

            <Path d="M19 13.68a1 1 0 0 0-1 1v1.91l-2.78-2.79a1 1 0 0 0-1.42 1.42L16.57 18h-1.88a1 1 0 0 0 0 2H19a1 1 0 0 0 1-1.11v-4.21a1 1 0 0 0-1-1z" />
          </G>
        </G>
      </Svg>
    </>
  );
};

export default ShuffleSvg;
