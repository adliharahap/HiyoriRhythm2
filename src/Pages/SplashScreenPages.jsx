import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setAudioFiles } from '../redux/slices/audioSlice';
import { fetchAudioFiles } from 'react-native-audio-files';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing
} from 'react-native-reanimated';
import { Flow } from 'react-native-animated-spinkit';
import LinearGradient from 'react-native-linear-gradient';


const SplashScreenPages = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
      checkPermissionsAndNavigate();
  }, []);

  const checkPermissionsAndNavigate = async () => {
      const onboardingStatus = await AsyncStorage.getItem('onboardingStatus');

      if (onboardingStatus === 'done') {
          let granted = false;

          if (Platform.OS === 'android') {
              if (Platform.Version >= 33) {
                  // Android 13+ (API 33+)
                  const readImages = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
                  const readVideo = await check(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO);
                  const readAudio = await check(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO);

                  granted = readImages === RESULTS.GRANTED &&
                            readVideo === RESULTS.GRANTED &&
                            readAudio === RESULTS.GRANTED;
              } else if (Platform.Version >= 30) {
                  // Android 11+ (API 30 - 32)
                  const readStorage = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
                  const manageStorage = await check(PERMISSIONS.ANDROID.MANAGE_EXTERNAL_STORAGE);

                  granted = readStorage === RESULTS.GRANTED || manageStorage === RESULTS.GRANTED;
              } else {
                  // Android 10 ke bawah
                  const readStorage = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
                  const writeStorage = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

                  granted = readStorage === RESULTS.GRANTED && writeStorage === RESULTS.GRANTED;
              }
          }

          if (granted) {
            try {
              let mappingFinished = false;

              const getAudioFiles = async () => {
                  try {
                      const result = await fetchAudioFiles();
                      dispatch(setAudioFiles(result));
                      
                  } catch (error) {
                      console.log('Error fetching audio files:', error);
                      // Tangani kesalahan jika perlu
                  }
              };
              await getAudioFiles();

              mappingFinished = true;

              if (mappingFinished) {
                  setTimeout(() => {
                      navigation.replace('MainScreen');
                  }, 4000);
              }
            }catch(e) {
              console.log("Sorry, The App Crashed : ", error);
            }
          } else {
              setTimeout(() => {
                navigation.replace('AksesDenied');
              }, 4000);
          }
      } else {
          setTimeout(() => {
            navigation.replace('Onboarding');
          }, 4000);
      }
  };

  return (
      <LinearGradient 
        colors={['#000000', '#1a001f', '#3d003f', '#520558']}
        locations={[0, 0.6, 0.8, 1]}
        style={styles.container}>
          <AnimatedImage />
          <BouncingText />
          <FlowLoading />
      </LinearGradient>
  );
};

const BouncingText = () => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      opacity.value = withTiming(1, { duration: 1000 });
    }, 1000);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
      return {
          opacity: opacity.value,
          fontFamily: 'Roboto-Bold',
          fontSize: 34,
          color: '#fff'
      };
  });

  return (
    <>
      <Animated.Text style={[styles.text, animatedStyle,]}>
          Hiyori Rhythm
      </Animated.Text>
    </>
  );
};

const AnimatedImage = () => {
  const translateY = useSharedValue(600);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
      // Jalankan animasi setelah komponen dipasang
      translateY.value = withSpring(0, {
          damping: 8,
          stiffness: 80,
          mass: 1,
      });
      opacity.value = withTiming(1, { duration: 2000, easing: Easing.elastic });
      rotate.value = withTiming(0, { duration: 3000, easing: Easing.bounce });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
      return {
          transform: [
              { translateY: translateY.value },
              { rotate: `${rotate.value}deg` },
          ],
          opacity: opacity.value,
          marginBottom: 60,
      };
  });

  return (
      <Animated.View style={[animatedStyle]}>
          <Image style={{height: 120, width: 120, borderRadius: 30}} source={require('../assets/images/Picsart_24-08-17_22-50-23-244.jpg')} />
      </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
});

const FlowLoading = () => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      opacity.value = withTiming(1, { duration: 2000, easing: Easing.ease });
    }, 1000);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
        opacity: opacity.value,
        marginTop: 20,
    };
  });

  return(
    <Animated.View style={[animatedStyle]}>
      <Flow size={30} color="#fafafa" />
    </Animated.View>
  )
}

export default SplashScreenPages;