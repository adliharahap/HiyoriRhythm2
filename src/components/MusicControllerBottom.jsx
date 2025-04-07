import { View, Text, TouchableWithoutFeedback, Image, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import TextTicker from 'react-native-text-ticker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Svg, Path } from 'react-native-svg';
import TrackPlayer, { useProgress, useTrackPlayerEvents, Event } from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayMusic, setStopPlayMusic } from '../redux/slices/audioSlice';
import MusicControl from 'react-native-music-control';
import { updateTrackInfo } from '../utils/PlayMusicutils/TrackUtils';
import { selectTrackArtist, selectTrackArtwork, selectTrackTitle } from '../redux/slices/trackSlice';
import { useNavigation } from '@react-navigation/native';
import { Slider } from '@miblanchard/react-native-slider';
import { saveImageToAppFolder } from '../utils/getImagesMusic';


const MusicControllerBottom = () => {

    const title = useSelector(selectTrackTitle);
    const artist = useSelector(selectTrackArtist);
    const artwork = useSelector(selectTrackArtwork);
    const shuffledArray = useSelector((state) => state.audio.shuffledArray);
    const isPlaying = useSelector((state) => state.audio.playMusic);

    const dispatch = useDispatch();
    const progress = useProgress();
    const navigation= useNavigation();

    const showNotification = async (title, artist, duration, artwork, album) => {
        try {
            if(artwork !== 'content://media/external/audio/albumart/1') {
                try {
                    await saveImageToAppFolder(artwork);
                } catch (error) {
                    console.log(error);
                }
            }
            const defaultImages = artwork === 'content://media/external/audio/albumart/1' ? require('../assets/images/DefaultMusic.png') : 'file:///storage/emulated/0/Android/data/com.hiyorirhythm/files/MyAppImages/profile_image.jpg';
            MusicControl.setNowPlaying({
                title: title,
                artwork: defaultImages, // Path ke album art
                artist: artist === "<unknown>" ? "Unknown Artist" : artist,
                album: album,
                duration: duration, // (Seconds)
                colorized: true,
                notificationIcon: 'my_custom_icon', // Android Only (String), Android Drawable resource name for a custom notification icon
            });
        } catch (error) {
            console.log('Error displaying music notification:', error);
        }
    };

    useEffect(() => {
        async function checkTrackPlayerShuffleEnd() {
            const getvalue = await AsyncStorage.getItem('QueQueSelected');
            const selectedvalue = parseInt(getvalue, 10);

            if (selectedvalue == 2) {
                if (progress.duration && progress.position) {
                    const remainingTime = progress.duration - progress.position;
                    if (remainingTime <= 2) {
                        handleNextPress();
                    }
                }
            }
        }
        checkTrackPlayerShuffleEnd();
    }, [progress.position]);

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
        updateTrackInfo(dispatch, showNotification);
    });

    useTrackPlayerEvents([Event.PlaybackQueueEnded], async(event) => {
        await TrackPlayer.skip(0);
    });

    const handlePrevPress = async () => {
        const getvalue = await AsyncStorage.getItem('QueQueSelected');
        const selectedvalue = parseInt(getvalue, 10);
        if (selectedvalue === 1) {
            await TrackPlayer.skipToPrevious();

        }else if(selectedvalue === 2) {
            const currentIndex = await TrackPlayer.getCurrentTrack();
            const currentId = shuffledArray.indexOf(currentIndex);
        
            // Tentukan indeks track sebelumnya
            let previousIndex = currentId - 1;
            if (previousIndex < 0) {
                previousIndex = shuffledArray.length - 1; // Kembali ke akhir array jika sudah mencapai awal
            }

            await TrackPlayer.skip(shuffledArray[previousIndex]);
        }else if(selectedvalue === 3) {
            await TrackPlayer.skipToPrevious();
        }
        await TrackPlayer.play();
        dispatch(setPlayMusic());
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PLAYING,
        });
        updateTrackInfo(dispatch, showNotification);
    };

    const handleNextPress = async () => {
        const getvalue = await AsyncStorage.getItem('QueQueSelected');
        const selectedvalue = parseInt(getvalue, 10);
        if (selectedvalue === 1) {
            await TrackPlayer.skipToNext();
        }else if(selectedvalue === 2) {
            const currentIndex = await TrackPlayer.getCurrentTrack(); // Dapatkan ID dari lagu yang sedang diputar
            const currentId = shuffledArray.indexOf(currentIndex); // Cari indeks dari ID saat ini di shuffledArray

            let nextIndex = currentId + 1;
            if (nextIndex >= shuffledArray.length) {
                nextIndex = 0; // Kembali ke awal array jika sudah mencapai akhir
            }

            await TrackPlayer.skip(shuffledArray[nextIndex]);
        }else if(selectedvalue === 3) {
            await TrackPlayer.skipToNext();
        }
        await TrackPlayer.play();
        dispatch(setPlayMusic());
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PLAYING,
        });
        updateTrackInfo(dispatch, showNotification);
    };

    const handlePause = async () => {
        await TrackPlayer.pause();
        dispatch(setStopPlayMusic());
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PAUSED,
        });
    }

    const handlePlay = async () => {
        await TrackPlayer.play();
        dispatch(setPlayMusic());
        // Perbarui ikon di notifikasi saat tombol play diklik
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PLAYING,
        });
    };

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setKeyboardVisible(true); // or some other action
        }
        );
        const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setKeyboardVisible(false); // or some other action
        }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <View style={{backgroundColor: '#303030', height: 60, width: '100%', position: 'absolute', zIndex: 999, bottom: isKeyboardVisible ? 0 : 70, borderRadius: 10, overflow: 'hidden'}}>
            <TouchableWithoutFeedback onPress={() => {navigation.navigate('MusicPlay', { MusicId: 999999 })}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: 50, overflow: 'hidden', justifyContent: 'center', alignItems: 'flex-end'}}>
                        {artwork === 'content://media/external/audio/albumart/1' ? (
                            <Image source={require('../assets/images/DefaultMusic.png')} style={{width: 40, height: 40, resizeMode: 'cover', borderRadius: 5}} />
                        ) : (
                            <Image source={{uri: artwork}} style={{width: 40, height: 40, resizeMode: 'cover', borderRadius: 5}} />
                        )}
                    </View>
                    <View style={{width: '57%', paddingHorizontal: 5}}>
                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <TextTicker
                                style={{ fontFamily: 'Poppins-SemiBold', fontSize: 12, color: '#FFFFFF' }}
                                duration={7000} // Durasi pergerakan teks
                                loop // Mengulangi animasi
                                bounce // Memberikan efek pantulan
                                repeatSpacer={50} // Jarak kembali ke awal
                                marqueeDelay={2000} // Jeda sebelum animasi dimulai
                                scroll
                            >
                                {title}
                            </TextTicker>
                        </View>
                        <View style={{flex: 1, justifyContent: 'flex-start'}}>
                            <Text numberOfLines={1} style={{ fontFamily: 'Poppins-Regular', fontSize: 11, color: '#cccccc' }}> {artist === "<unknown>" ? "Unknown Artist" : artist}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity onPress={handlePrevPress}>
                                <Svg width="18" height="18" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" style={{transform: [{rotate: '180deg'}]}}>
                                    <Path d="M1.79062 2.09314C1.63821 1.98427 1.43774 1.96972 1.27121 2.05542C1.10467 2.14112 1 2.31271 1 2.5V12.5C1 12.6873 1.10467 12.8589 1.27121 12.9446C1.43774 13.0303 1.63821 13.0157 1.79062 12.9069L8.79062 7.90687C8.92202 7.81301 9 7.66148 9 7.5C9 7.33853 8.92202 7.18699 8.79062 7.09314L1.79062 2.09314Z" fill="#FFFFFF" />
                                    <Path d="M13 13H14V2H13V13Z" fill="#FFFFFF"/>
                                </Svg>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            {isPlaying ? (
                                <View>
                                    <TouchableOpacity onPress={handlePause}>
                                        <Svg fill="#FFFFFF" width="26" height="26" viewBox="-64 0 512 512" xmlns="http://www.w3.org/2000/svg" ><Path d="M64 96L160 96 160 416 64 416 64 96ZM224 96L320 96 320 416 224 416 224 96Z" /></Svg>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View>
                                    <TouchableOpacity onPress={handlePlay}>
                                        <Svg width="26" height="26" viewBox="0 0 15 15" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><Path d="M4.79062 2.09314C4.63821 1.98427 4.43774 1.96972 4.27121 2.05542C4.10467 2.14112 4 2.31271 4 2.5V12.5C4 12.6873 4.10467 12.8589 4.27121 12.9446C4.43774 13.0303 4.63821 13.0157 4.79062 12.9069L11.7906 7.90687C11.922 7.81301 12 7.66148 12 7.5C12 7.33853 11.922 7.18699 11.7906 7.09314L4.79062 2.09314Z"/></Svg>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={handleNextPress}>
                                <Svg width="18" height="18" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M1.79062 2.09314C1.63821 1.98427 1.43774 1.96972 1.27121 2.05542C1.10467 2.14112 1 2.31271 1 2.5V12.5C1 12.6873 1.10467 12.8589 1.27121 12.9446C1.43774 13.0303 1.63821 13.0157 1.79062 12.9069L8.79062 7.90687C8.92202 7.81301 9 7.66148 9 7.5C9 7.33853 8.92202 7.18699 8.79062 7.09314L1.79062 2.09314Z" fill="#FFFFFF" />
                                    <Path d="M13 13H14V2H13V13Z" fill="#FFFFFF"/>
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View style={{height: 1, width: '100%', position: 'absolute', bottom: 20}}>
                <Slider
                    style={{ width: '100%'}}
                    minimumValue={0}
                    maximumValue={progress.duration}
                    value={progress.position}
                    disabled={true}
                    thumbTintColor='#FFFFFF'
                    minimumTrackTintColor='#7f00ff'
                    maximumTrackTintColor='#fdfdfd'
                    trackStyle={{height: 1.5, borderRadius: 50}}
                    thumbStyle={{height: 0, width: 0}}
                />
            </View>
        </View>
    )
}

export default MusicControllerBottom;