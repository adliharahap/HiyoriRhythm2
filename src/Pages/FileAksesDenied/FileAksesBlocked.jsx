import { View, Text, Image, StatusBar, TouchableOpacity, Linking, Platform } from 'react-native';
import React, {useState, useEffect} from 'react';
import { check ,request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';

const FileAksesBlocked = () => {
    const [checkPermissions, setCheckPermissions] = useState(false);
    const navigation = useNavigation();

    const checkPermissionsAndNavigate = async () => {
        const readPermission = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        const writePermission = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

        if (readPermission === RESULTS.GRANTED && writePermission === RESULTS.GRANTED) {
            setCheckPermissions(true);
            navigation.replace('Onboarding');
        }
    };

    useEffect(() => {
        const intervalId = setInterval(checkPermissionsAndNavigate, 1000); // Ganti dengan interval waktu yang diinginkan (dalam milidetik)
        
        // Membersihkan interval saat komponen di-unmount atau saat useEffect dijalankan kembali
        return () => clearInterval(intervalId);
    }, []);

    const openAppSettings = () => {
        // Jika platform adalah Android
        if (Platform.OS === 'android') {
            Linking.openSettings();
        }
        // Jika platform adalah iOS
        else if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
        }
    };

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={{height: 80, width: '100%',paddingTop: 30}}>
                <Text style={{color: '#001524', fontFamily: 'Poppins-Black', fontSize: 24, textAlign: 'center'}}>Berikan Izin Aplikasi</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={{color: 'black', fontFamily: 'Poppins-Regular', fontSize: 18, textAlign: 'justify', paddingHorizontal: 20}}>Yaa, sepertinya izin aplikasimu terputus, nih. Ayo, izinkan aplikasi untuk mengakses fitur-fitur keren dan memberikan pengalaman terbaik. Jangan ragu memberikan izin yang dibutuhkan. Terima kasih banyak atas kerjasamanya!</Text>
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
                    {checkPermissions ? 
                    (
                        <TouchableOpacity onPress={openAppSettings} style={{height: 70, width: 220, backgroundColor: '#001B79', justifyContent: 'center', alignItems: 'center', borderRadius: 100}}>
                            <Text style={{color: 'white', fontFamily: 'Poppins-Bold', fontSize: 18, textAlign: 'center'}}>Get Started!</Text>
                        </TouchableOpacity>
                    ) 
                    : 
                    (
                        <TouchableOpacity onPress={openAppSettings} style={{height: 70, width: 220, backgroundColor: '#001B79', justifyContent: 'center', alignItems: 'center', borderRadius: 100}}>
                            <Text style={{color: 'white', fontFamily: 'Poppins-Bold', fontSize: 18, textAlign: 'center'}}>Berikan Izin Aplikasi</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View style={{flex: 1}}>
                <Image style={{height: '100%', width: '100%'}} source={require('../onboarding/Onboarding-Images/izinakses.jpeg')} />
            </View>
        </View>
    );
};

export default FileAksesBlocked;