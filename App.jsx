import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import SplashScreenPages from './src/Pages/SplashScreenPages';
import OnboardingScreen from './src/Pages/onboarding/OnboardingScreen';
import FIleAksesDenied from './src/Pages/FileAksesDenied/FIleAksesDenied';
import MainScreen from './src/Pages/MainScreen';
import PlayMusicLyrics from './src/Pages/screens/PlayMusicLyrics';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_bottom'}} initialRouteName='SplashScreen'>
          <Stack.Screen name='SplashScreen' component={SplashScreenPages} />
          <Stack.Screen name='Onboarding' component={OnboardingScreen} />
          <Stack.Screen name='AksesDenied' component={FIleAksesDenied} />
          <Stack.Screen name='MainScreen' component={MainScreen} />
          <Stack.Screen name='MusicPlay' component={PlayMusicLyrics} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


export default App;