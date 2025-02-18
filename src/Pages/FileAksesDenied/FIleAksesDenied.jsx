import { View, Text, Image, StatusBar, TouchableOpacity, Platform, Linking } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import AccesDeniedSvg from '../../assets/Svg/AccesDeniedSvg';
import LinearGradient from 'react-native-linear-gradient';

const FileAksesDenied = () => {
    const [checkPermissions, setCheckPermissions] = useState(false);
    const navigation = useNavigation();
    const intervalRef = useRef(null);

    const checkPermissionsAndNavigate = async () => {
        let granted = false;

        if (Platform.OS === 'android') {
            if (Platform.Version >= 33) {
                // Android 13+ (API 33+)
                const readImages = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
                const readVideo = await check(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO);
                const readAudio = await check(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO);

                granted = readImages === RESULTS.GRANTED && readVideo === RESULTS.GRANTED && readAudio === RESULTS.GRANTED;
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
            clearInterval(intervalRef.current);
            navigation.replace('SplashScreen');
        }
    };

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            checkPermissionsAndNavigate();
        }, 2000);

        return () => clearInterval(intervalRef.current); // Hapus interval saat komponen di-unmount
    }, []);

    const openAppSettings = () => {
        if (Platform.OS === 'android') {
            openSettings();
        } else if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
        }
    };

    return (
        <LinearGradient
            colors={['#000000', '#3d0479']} // Radial gradient effect
            style={{ flex: 1 }}
        >
            <StatusBar backgroundColor="black" barStyle="dark-content" />
            <View style={{ height: 80, width: '100%', paddingTop: 30 }}>
                <Text style={{ color: '#fff', fontFamily: 'Montserrat-SemiBold', fontSize: 30, textAlign: 'center' }}>
                    Berikan Izin Aplikasi
                </Text>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 40 }}>
                {/* <Image style={{ height: '100%', width: '100%' }} source={require('../onboarding/Onboarding-Images/izinakses.jpeg')} /> */}
                <AccesDeniedSvg />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ color: '#fff', fontFamily: 'Montserrat-Regular', fontSize: 21, textAlign: 'center', paddingHorizontal: 20 }}>
                Izin aplikasi diperlukan untuk pengalaman terbaik. Yuk, aktifkan akses dan nikmati fitur-fiturnya!
                </Text>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                    <TouchableOpacity onPress={openAppSettings} style={{ height: 70, width: 220, backgroundColor: '#e70098', justifyContent: 'center', alignItems: 'center', borderRadius: 100 }}>
                        <Text style={{ color: 'white', fontFamily: 'Poppins-Bold', fontSize: 18, textAlign: 'center' }}>
                            Berikan Izin Aplikasi
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
};

export default FileAksesDenied;
