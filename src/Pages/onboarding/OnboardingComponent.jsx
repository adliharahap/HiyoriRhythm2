import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useNavigation} from '@react-navigation/native';
import Notification from './Notification';

const Slide1 = () => {
  const opacityTitle = useSharedValue(0);
  const opacityDesc = useSharedValue(0);
  const opacityIcon = useSharedValue(0);

  useEffect(() => {
    // Trigger animasi saat component mount
    opacityTitle.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });

    opacityDesc.value = withDelay(
      300,
      withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.exp),
      }),
    );

    opacityIcon.value = withDelay(
      600,
      withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.exp),
      }),
    );
  }, []);

  const animatedTitle = useAnimatedStyle(() => ({
    opacity: opacityTitle.value,
    transform: [{translateY: (1 - opacityTitle.value) * 20}],
  }));

  const animatedDesc = useAnimatedStyle(() => ({
    opacity: opacityDesc.value,
    transform: [{translateY: (1 - opacityDesc.value) * 20}],
  }));

  const animatedIcon = useAnimatedStyle(() => ({
    opacity: opacityIcon.value,
    transform: [{scale: opacityIcon.value}],
  }));

  return (
    <ImageBackground
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}
      source={require('../../assets/images/Onboarding/Slide1.jpg')}>
      <LinearGradient
        style={{...StyleSheet.absoluteFillObject}}
        colors={['rgba(0,0,0,0.3)', '#000']}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 140,
          }}>
          <Animated.View style={animatedIcon}>
            <Image
              source={require('../../assets/images/Onboarding/icons-apps.png')}
              style={{height: 130, width: 130, marginBottom: 40}}
            />
          </Animated.View>
          <View style={{alignItems: 'center'}}>
            <Animated.Text
              style={[
                animatedTitle,
                {
                  alignItems: 'center',
                  color: '#fff',
                  fontFamily: 'Poppins-Black',
                  fontSize: 32,
                  fontWeight: 'bold',
                  paddingBottom: 30,
                },
              ]}>
              Welcome to Hiyori Rhythm
            </Animated.Text>
            <Animated.Text
              style={[
                animatedDesc,
                {
                  color: 'rgb(223, 223, 223)',
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 16,
                  textAlign: 'center',
                  paddingHorizontal: 20,
                  paddingBottom: 50,
                },
              ]}>
              Tempat di mana musik favoritmu selalu menemani! Siap untuk
              pengalaman mendengarkan yang lebih seru?
            </Animated.Text>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const Slide2 = () => {
  const [NameInputValue, setNameInputValue] = useState('');
  const [borderfocus, setborderfocus] = useState('black');
  const [isNameSaved, setIsNameSaved] = useState(false);

  useEffect(() => {
    getNameFromAsyncStorage();
  }, []);

  const getNameFromAsyncStorage = async () => {
    const Name = await AsyncStorage.getItem('UserName');
    if (Name) {
      setNameInputValue(Name);
      setIsNameSaved(true);
    }
  };

  const saveNameToAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('UserName', NameInputValue);
      setIsNameSaved(true);
    } catch (error) {
      console.log(`data nama user gagal di simpan : ${error}`);
    }
  };

  const greetingOpacity = useSharedValue(0);
  // Animasi saat nama tersimpan
  useEffect(() => {
    if (isNameSaved) {
      greetingOpacity.value = withTiming(1, {
        duration: 2000,
        easing: Easing.out(Easing.exp),
      });
    }
  }, [isNameSaved]);

  const animatedGreeting = useAnimatedStyle(() => ({
    opacity: greetingOpacity.value,
    transform: [
      {
        scale: greetingOpacity.value === 0 ? 0.9 : 1,
      },
    ],
  }));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <ImageBackground
          source={require('../../assets/images/Onboarding/slide2.jpg')}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LinearGradient
            style={{...StyleSheet.absoluteFillObject}}
            colors={['rgba(0,0,0,0.1)', '#000']}></LinearGradient>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingBottom: 140,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Black',
                fontSize: 32,
                fontWeight: 'bold',
                paddingBottom: 30,
                paddingLeft: 20,
              }}>
              Biar lebih akrab, boleh tahu nama kamu?
            </Text>
            {!isNameSaved ? (
              <>
                <TextInput
                  autoCorrect={true}
                  value={NameInputValue}
                  maxLength={25}
                  onChangeText={setNameInputValue}
                  selectionColor={'rgb(249, 249, 249)'}
                  style={{
                    borderColor: borderfocus,
                    borderWidth: 1.5,
                    color: 'white',
                    minWidth: '90%',
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    fontFamily: 'Poppins-Regular',
                    fontSize: 14,
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(83, 83, 83, 0.7)',
                    paddingVertical: 15,
                  }}
                  onFocus={() => {
                    setborderfocus('#fafafa');
                  }}
                  onBlur={() => {
                    setborderfocus('#fff');
                  }}
                  placeholder="Masukkan nama kamu"
                />
                <TouchableOpacity onPress={saveNameToAsyncStorage}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Poppins-Bold',
                      fontSize: 16,
                      marginTop: 40,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderRadius: 50,
                      backgroundColor: 'rgba(255, 1, 191, 0.6)',
                    }}>
                    Simpan Nama
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Animated.View
                  style={[animatedGreeting, {alignItems: 'center'}]}>
                  <Text
                    style={{
                      color: 'rgb(246, 246, 246)',
                      fontFamily: 'Montserrat-Bold',
                      fontSize: 26,
                      textAlign: 'center',
                      paddingHorizontal: 40,
                      paddingTop: 70,
                    }}>
                    hi{' '}
                    <Text style={{color: 'rgb(255, 105, 180)'}}>
                      {/* Warna berbeda untuk nama */}
                      {NameInputValue}
                    </Text>
                    , let's start this rhythm journey!
                  </Text>
                </Animated.View>
              </>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const Slide3 = () => {
  const [checkPermissions, setCheckPermissions] = useState(0);
  const navigation = useNavigation();

  const checkPermissionsMusic = async () => {
    let granted = false;

    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        // Android 13+ (API 33+)
        const readImages = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        const readVideo = await check(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO);
        const readAudio = await check(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO);

        granted =
          readImages === RESULTS.GRANTED &&
          readVideo === RESULTS.GRANTED &&
          readAudio === RESULTS.GRANTED;
      } else if (Platform.Version >= 30) {
        // Android 11+ (API 30 - 32)
        const readStorage = await check(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        const manageStorage = await check(
          PERMISSIONS.ANDROID.MANAGE_EXTERNAL_STORAGE,
        );

        granted =
          readStorage === RESULTS.GRANTED || manageStorage === RESULTS.GRANTED;
      } else {
        // Android 10 ke bawah
        const readStorage = await check(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        const writeStorage = await check(
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );

        granted =
          readStorage === RESULTS.GRANTED && writeStorage === RESULTS.GRANTED;
      }
    }

    if (granted) {
      setCheckPermissions(1);
    }
  };

  useEffect(() => {
    checkPermissionsMusic();
  }, []);

  const requestStoragePermission = async () => {
    try {
      let granted = false;

      if (Platform.OS === 'android') {
        if (Platform.Version >= 33) {
          // Android 13+ (API 33+)
          const readImages = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
          const readVideo = await check(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO);
          const readAudio = await check(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO);

          if (readImages !== RESULTS.GRANTED) {
            await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
          }
          if (readVideo !== RESULTS.GRANTED) {
            await request(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO);
          }
          if (readAudio !== RESULTS.GRANTED) {
            await request(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO);
          }

          // Cek lagi setelah meminta
          granted =
            (await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)) ===
              RESULTS.GRANTED &&
            (await check(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO)) ===
              RESULTS.GRANTED &&
            (await check(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO)) ===
              RESULTS.GRANTED;
        } else if (Platform.Version >= 30) {
          // Android 11+ (API 30 - 32)
          const readStorage = await check(
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          );
          const manageStorage = await check(
            PERMISSIONS.ANDROID.MANAGE_EXTERNAL_STORAGE,
          );

          if (readStorage !== RESULTS.GRANTED) {
            await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
          }
          if (manageStorage !== RESULTS.GRANTED) {
            await request(PERMISSIONS.ANDROID.MANAGE_EXTERNAL_STORAGE);
          }

          granted =
            (await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)) ===
              RESULTS.GRANTED ||
            (await check(PERMISSIONS.ANDROID.MANAGE_EXTERNAL_STORAGE)) ===
              RESULTS.GRANTED;
        } else {
          // Android 10 ke bawah
          const readStorage = await check(
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          );
          const writeStorage = await check(
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          );

          if (readStorage !== RESULTS.GRANTED) {
            await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
          }
          if (writeStorage !== RESULTS.GRANTED) {
            await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
          }

          granted =
            (await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)) ===
              RESULTS.GRANTED &&
            (await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)) ===
              RESULTS.GRANTED;
        }
      }

      if (granted) {
        setCheckPermissions(1);
      } else {
        setCheckPermissions(2);
      }
    } catch (error) {
      console.error('Error saat meminta izin:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <ImageBackground
        source={require('../../assets/images/Onboarding/slide3.jpg')}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LinearGradient
          style={{...StyleSheet.absoluteFillObject}}
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}></LinearGradient>
      </ImageBackground>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingBottom: 140,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Poppins-Black',
              fontSize: 32,
              fontWeight: 'bold',
              paddingBottom: 30,
              paddingLeft: 20,
            }}>
            Izinkan Kami Mengakses Musik di Perangkatmu
          </Text>
          {checkPermissions === 0 ? (
            <>
              <Text
                style={{
                  color: 'rgb(223, 223, 223)',
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 18,
                  textAlign: 'center',
                  paddingHorizontal: 30,
                  marginTop: 30,
                  paddingBottom: 30,
                }}>
                Untuk menemukan lagu favoritmu, Hiyori Rhythm butuh izin membaca
                file musik di perangkatmu.
              </Text>
              <TouchableOpacity onPress={requestStoragePermission}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Poppins-Bold',
                    fontSize: 16,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 50,
                    backgroundColor: 'rgba(255, 1, 191, 0.6)',
                  }}>
                  Izinkan Akses
                </Text>
              </TouchableOpacity>
            </>
          ) : checkPermissions === 2 ? (
            <>
              <Text
                style={{
                  color: 'rgb(223, 223, 223)',
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 18,
                  textAlign: 'center',
                  paddingHorizontal: 30,
                  marginTop: 30,
                  paddingBottom: 30,
                }}>
                Yah... tanpa izin ini, Hiyori Rhythm gak bisa mengakses
                lagu-lagu kesayanganmu. Masa iya kamu tega ninggalin musik
                favoritmu begitu saja? 🎶🥺
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('AksesDenied')}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Poppins-Bold',
                    fontSize: 16,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 50,
                    backgroundColor: 'rgba(255, 1, 191, 0.6)',
                  }}>
                  Izinkan Akses
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text
                style={{
                  color: 'rgb(223, 223, 223)',
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 20,
                  textAlign: 'center',
                  paddingHorizontal: 30,
                  marginTop: 30,
                  paddingBottom: 30,
                }}>
                Izin akses diterima, siap untuk merasakan musik yang luar biasa
                di Hiyori Rhythm! 🥰
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const Slide4 = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [NotificationStatus, setNotificationStatus] = useState();
  const [NotificationMessage, SetNotificationMessage] = useState('');
  const navigation = useNavigation();

  const checkPermissionsAndName = async () => {
    let granted = false;

    // Cek izin untuk musik
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        // Android 13+ (API 33+)
        const readImages = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        const readVideo = await check(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO);
        const readAudio = await check(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO);

        granted =
          readImages === RESULTS.GRANTED &&
          readVideo === RESULTS.GRANTED &&
          readAudio === RESULTS.GRANTED;
      } else if (Platform.Version >= 30) {
        // Android 11+ (API 30 - 32)
        const readStorage = await check(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        const manageStorage = await check(
          PERMISSIONS.ANDROID.MANAGE_EXTERNAL_STORAGE,
        );

        granted =
          readStorage === RESULTS.GRANTED || manageStorage === RESULTS.GRANTED;
      } else {
        // Android 10 ke bawah
        const readStorage = await check(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        const writeStorage = await check(
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );

        granted =
          readStorage === RESULTS.GRANTED && writeStorage === RESULTS.GRANTED;
      }
    }

    // Cek apakah izin sudah diberikan
    if (granted) {
      // Cek apakah nama sudah ada di AsyncStorage
      const userName = await AsyncStorage.getItem('UserName');
      if (userName) {
        setNotificationStatus(true);
        SetNotificationMessage(
          'Selamat! Nama kamu berhasil disimpan, dan akses file telah diizinkan. Kamu siap menjelajahi dunia musik bersama Hiyori Rhythm!',
        );
        setShowNotification(true);
        AsyncStorage.setItem('onboardingStatus', 'done');
      } else {
        setNotificationStatus(false);
        SetNotificationMessage(
          'Mohon isi nama terlebih dahulu agar kami dapat memberikan pengalaman yang lebih personal. Jangan lupa izinkan aplikasi untuk mengakses file agar kamu bisa menikmati semua fitur Hiyori Rhythm!',
        );
        setShowNotification(true);
      }
    } else {
      setNotificationStatus(false);
      SetNotificationMessage(
        'Tolong izinkan aplikasi untuk mengakses file di perangkat Kamu. Ini penting untuk memberikan pengalaman mendengarkan musik terbaik tanpa hambatan. Terima kasih!',
      );
      setShowNotification(true);
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);

    if (NotificationStatus === true) {
      navigation.replace('SplashScreen');
    }
  };
  return (
    <ImageBackground
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}
      source={require('../../assets/images/Onboarding/slide4.jpg')}>
      <LinearGradient
        style={{...StyleSheet.absoluteFillObject}}
        colors={['rgba(0,0,0,0.6)', '#000']}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 220,
          }}>
          <View>
            <Image
              source={require('../../assets/images/Onboarding/icons-apps.png')}
              style={{height: 130, width: 130, marginBottom: 20}}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                alignItems: 'center',
                color: '#fff',
                fontFamily: 'Poppins-Black',
                fontSize: 32,
                fontWeight: 'bold',
                paddingBottom: 30,
                paddingHorizontal: 10,
                textAlign: 'center',
              }}>
              Semua siap? Saatnya nikmati musik favoritmu
            </Text>
            <Text
              style={{
                color: 'rgb(223, 223, 223)',
                fontFamily: 'Montserrat-Medium',
                fontSize: 18,
                textAlign: 'center',
                paddingHorizontal: 20,
                paddingBottom: 30,
              }}>
              Cari lagu favoritmu, buat playlist, dan dengarkan kapan saja!
              Hiyori Rhythm selalu ada untuk menemani harimu
            </Text>
            <TouchableOpacity onPress={checkPermissionsAndName}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Bold',
                  fontSize: 16,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 50,
                  backgroundColor: 'rgba(255, 1, 191, 0.6)',
                }}>
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            top: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {showNotification && (
            <Notification
              message={NotificationMessage}
              onClose={handleCloseNotification}
              status={NotificationStatus}
            />
          )}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export {Slide1, Slide2, Slide3, Slide4};
