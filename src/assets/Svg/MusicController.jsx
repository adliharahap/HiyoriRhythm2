import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export const PlayIcon = ({ size = 48, color = '#fff' }) => (
    <Svg width={size} height={size} viewBox="0 0 56 56" fill="none">
        <Path
            fill={color}
            d="M27.9999 51.9063C41.0546 51.9063 51.9063 41.0781 51.9063 28C51.9063 14.9453 41.0312 4.0937 27.9765 4.0937C14.8983 4.0937 4.0937 14.9453 4.0937 28C4.0937 41.0781 14.9218 51.9063 27.9999 51.9063ZM23.7109 37.0469C22.6327 37.7031 21.414 37.1875 21.414 36.0625V19.9375C21.414 18.8594 22.703 18.3906 23.7109 18.9766L36.8827 26.7812C37.8436 27.3437 37.8671 28.6797 36.8827 29.2656L23.7109 37.0469Z"
        />
    </Svg>
);

export const PauseIcon = ({ size = 48, color = '#fff' }) => (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <Path
            fill={color}
            d="M24 2A22 22 0 1 0 46 24 21.9 21.9 0 0 0 24 2ZM21 31a2 2 0 0 1-4 0V17a2 2 0 0 1 2-2 2.1 2.1 0 0 1 2 2Zm10 0a2 2 0 0 1-4 0V17a2 2 0 0 1 2-2 2.1 2.1 0 0 1 2 2Z"
        />
    </Svg>
);

export const PrevIcon = ({ size = 22, color = '#F5F5F5' }) => (
    <Svg width={size} height={size} viewBox="0 0 51.531 51.531" style={{ transform: [{ rotate: '180deg' }] }}>
        <Path
            fill={color}
            d="M44.9 1.963c-3.662 0-6.631 2.969-6.631 6.631V23.81c-.285-.324-.617-.609-1-.831L6 4.926c-1.238-.715-2.762-.715-4 0C.763 5.64 0 6.961 0 8.39v36.104c0 1.43.763 2.75 2 3.465.619.356 1.311.535 2 .535.691 0 1.381-.179 2-.535L37.269 29.305c.383-.223.715-.508 1-.832v13.863c0 3.662 2.969 6.631 6.631 6.631s6.631-2.969 6.631-6.631V8.594c0-3.662-2.969-6.631-6.631-6.631z"
        />
    </Svg>
);

export const NextIcon = ({ size = 22, color = '#F5F5F5' }) => (
    <Svg width={size} height={size} viewBox="0 0 51.531 51.531">
        <Path
            fill={color}
            d="M44.9 1.963c-3.662 0-6.631 2.969-6.631 6.631V23.81c-.285-.324-.617-.609-1-.831L6 4.926c-1.238-.715-2.762-.715-4 0C.763 5.64 0 6.961 0 8.39v36.104c0 1.43.763 2.75 2 3.465.619.356 1.311.535 2 .535.691 0 1.381-.179 2-.535L37.269 29.305c.383-.223.715-.508 1-.832v13.863c0 3.662 2.969 6.631 6.631 6.631s6.631-2.969 6.631-6.631V8.594c0-3.662-2.969-6.631-6.631-6.631z"
        />
    </Svg>
);

export const TimerMusic = () => (
    <Svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" height={34} width={34}><G id="SVGRepo_bgCarrier" stroke-width="0"></G><G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G><G id="SVGRepo_iconCarrier"><Path d="M19 7L17.6569 8.34315M17.6569 8.34315C16.2091 6.89543 14.2091 6 12 6C7.58172 6 4 9.58172 4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14C20 11.7909 19.1046 9.79086 17.6569 8.34315ZM12 10V14M9 3H15" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></Path></G></Svg>
);

