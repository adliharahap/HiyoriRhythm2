import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SearchMusicScreen from './screens/SearchMusicScreen';
import ListMusicScreen from './screens/ListMusicScreen';
import Playlistcreen from './screens/Playlistcreen';
import Profiles from './screens/Profiles';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';
import SortModal from '../components/Modals/SortModal';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../redux/slices/modalSlice';

const Tab = createBottomTabNavigator();

// Custom TabBar Button with SVG icons
const CustomTabBarButton = ({children, onPress}) => {
  return (
    <TouchableOpacity style={styles.btnCircleUp} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const HomeIcon = ({focused, color, size}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M21.4498 10.275L11.9998 3.1875L2.5498 10.275L2.9998 11.625H3.7498V20.25H20.2498V11.625H20.9998L21.4498 10.275ZM5.2498 18.75V10.125L11.9998 5.0625L18.7498 10.125V18.75H14.9999V14.3333L14.2499 13.5833H9.74988L8.99988 14.3333V18.75H5.2498ZM10.4999 18.75H13.4999V15.0833H10.4999V18.75Z"
      fill={focused ? '#f0008f' : color}
    />
  </Svg>
);

const SearchIcon = ({focused, size, color}) => (
  <Svg
    height={size}
    viewBox="0 -960 960 960"
    width={size}
    fill={focused ? '#f0008f' : color}>
    <Path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
  </Svg>
);

const MusicIcon = ({focused, color, size}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M12.75 12.508L21.25 9.108V14.7609C20.7449 14.4375 20.1443 14.25 19.5 14.25C17.7051 14.25 16.25 15.7051 16.25 17.5C16.25 19.2949 17.7051 20.75 19.5 20.75C21.2949 20.75 22.75 19.2949 22.75 17.5C22.75 17.5 22.75 17.5 22.75 17.5L22.75 7.94625C22.75 6.80342 22.75 5.84496 22.6696 5.08131C22.6582 4.97339 22.6448 4.86609 22.63 4.76597C22.5525 4.24426 22.4156 3.75757 22.1514 3.35115C22.0193 3.14794 21.8553 2.96481 21.6511 2.80739C21.6128 2.77788 21.573 2.74927 21.5319 2.7216L21.5236 2.71608C20.8164 2.2454 20.0213 2.27906 19.2023 2.48777C18.4102 2.68961 17.4282 3.10065 16.224 3.60469L14.13 4.48115C13.5655 4.71737 13.0873 4.91751 12.712 5.1248C12.3126 5.34535 11.9686 5.60548 11.7106 5.99311C11.4527 6.38075 11.3455 6.7985 11.2963 7.25204C11.25 7.67831 11.25 8.19671 11.25 8.80858V16.7609C10.7448 16.4375 10.1443 16.25 9.5 16.25C7.70507 16.25 6.25 17.7051 6.25 19.5C6.25 21.2949 7.70507 22.75 9.5 22.75C11.2949 22.75 12.75 21.2949 12.75 19.5C12.75 19.5 12.75 19.5 12.75 19.5L12.75 12.508Z"
      fill={focused ? '#f0008f' : color}
    />
    <Path
      opacity="0.5"
      d="M7.75 2C7.75 1.58579 7.41421 1.25 7 1.25C6.58579 1.25 6.25 1.58579 6.25 2V7.76091C5.74485 7.4375 5.14432 7.25 4.5 7.25C2.70507 7.25 1.25 8.70507 1.25 10.5C1.25 12.2949 2.70507 13.75 4.5 13.75C6.29493 13.75 7.75 12.2949 7.75 10.5V5.0045C8.44852 5.50913 9.27955 5.75 10 5.75C10.4142 5.75 10.75 5.41421 10.75 5C10.75 4.58579 10.4142 4.25 10 4.25C9.54565 4.25 8.9663 4.07389 8.51159 3.69837C8.0784 3.34061 7.75 2.79785 7.75 2Z"
      fill={focused ? '#f0008f' : color}
    />
  </Svg>
);

const PlaylistIcon = ({focused, color, size}) => (
  <Svg
    height={size}
    viewBox="0 -960 960 960"
    width={size}
    fill={focused ? '#f0008f' : color}>
    <Path d="M500-360q42 0 71-29t29-71v-220h120v-80H560v220q-13-10-28-15t-32-5q-42 0-71 29t-29 71q0 42 29 71t71 29ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z" />
  </Svg>
);

const ProfileIcon = ({focused, color, size}) => (
  <Svg
    fill={focused ? '#f0008f' : color}
    width={size}
    height={size}
    viewBox="0 0 56 56"
    xmlns="http://www.w3.org/2000/svg">
    <Path d="M 28.0117 27.3672 C 33.0508 27.3672 37.3867 22.8672 37.3867 17.0078 C 37.3867 11.2187 33.0274 6.9297 28.0117 6.9297 C 22.9961 6.9297 18.6367 11.3125 18.6367 17.0547 C 18.6367 22.8672 22.9961 27.3672 28.0117 27.3672 Z M 13.2930 49.0703 L 42.7305 49.0703 C 46.4101 49.0703 47.7226 48.0156 47.7226 45.9531 C 47.7226 39.9062 40.1523 31.5625 28.0117 31.5625 C 15.8477 31.5625 8.2774 39.9062 8.2774 45.9531 C 8.2774 48.0156 9.5898 49.0703 13.2930 49.0703 Z" />
  </Svg>
);

const MainScreen = () => {
  const modalVisible = useSelector((state) => state.modal.isVisible);
  const isPlayingFirst = useSelector((state) => state.audio.playFirst);
  const dispatch = useDispatch();

  return (
    <>
      <SortModal visible={modalVisible} onClose={() => dispatch(hideModal())} />
      <Tab.Navigator
        initialRouteName="Music"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarStyle: {
            height: 70,
            width: '100%',
            backgroundColor: '#1D1F24',
            position: 'absolute',
            borderRadius: 12,
            borderTopWidth: 0,
            paddingTop: 10,
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#7E7E7E',
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Montserrat-Medium',
          },
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <HomeIcon focused={focused} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchMusicScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <SearchIcon focused={focused} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Music"
          component={ListMusicScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <MusicIcon focused={focused} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Playlist"
          component={Playlistcreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <PlaylistIcon focused={focused} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profiles}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <ProfileIcon focused={focused} color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
});

export default MainScreen;
