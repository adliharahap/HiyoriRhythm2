import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeartIcon from '../../assets/Svg/HeartIcon';
import ShareIcon from '../../assets/Svg/ShareIcon';
import PlaylistIcon from '../../assets/Svg/PlaylistIcon';
import { Slider } from '@miblanchard/react-native-slider';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { ChangeSelectedOptions } from '../../utils/QueueUtils.js/changeSelectedQueque';
import Svg, { G, Path, Rect } from 'react-native-svg';
import { setPlayMusic, setSelectedQueQue, setStopPlayMusic } from '../../redux/slices/audioSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueueselectedSvg1, QueueselectedSvg2, QueueselectedSvg3 } from '../../assets/Svg/QueueselectedSvg';
import { NextIcon, PauseIcon, PlayIcon, PrevIcon, TimerMusic } from '../../assets/Svg/MusicController';
import { playNextTrack, setCurrentTrackIndex, setPlayer, setPlayerData, setPosition } from '../../redux/slices/PlayerSlice';
import Sound from 'react-native-sound';
import TextTicker from 'react-native-text-ticker';

const PlayMusicScreen = () => {
    const [imageUri, setImageUri] = useState({ uri: playerData?.imageUrl });
    const [hasSliding, setHasSliding] = useState(false);
    const [player, setPlayer] = useState(null);
    const dispatch = useDispatch();
    
    const queue = useSelector((state) => state.player.queue);
    const playerData = useSelector((state) => state.player.playerData); //Data Lagu Yang Sedang Diputar Saat Ini
    const position = useSelector((state) => state.player.position);
    const currentTrackIndex = useSelector((state) => state.player.currentTrackIndex);
    const isPlaying = useSelector((state) => state.audio.playMusic);
    const selectedQueque = useSelector((state) => state.audio.selectedQueQue);
    
    const route = useRoute();
    const receivedMusicId = route.params?.MusicId;
    
    //Set currentTrack pas pertama masuk
    // useEffect(() => {
    //     if (currentTrackIndex !== receivedMusicId) {
    //         dispatch(setCurrentTrackIndex(receivedMusicId));
    //     }
    // }, [receivedMusicId]);

    // Tiap props.img berubah, update imageUri
    useEffect(() => {
        setImageUri({ uri: playerData?.imageUrl });
    }, [playerData]);
    
    // Cleanup player function
    const cleanupPlayer = () => {
        if (player) {
            player.stop(() => {
                player.release();
                setPlayer(null) // Reset state player biar kosong lagi
            });
        }
    };
    
    // Function buat load & play lagu
    const loadAndPlayTrack = (index) => {
        cleanupPlayer(); // Bersihin dulu player sebelumnya
    
        const track = queue[index];
        if (!track?.audioUrl) {
            console.error('🚨 Invalid track');
            return;
        }
    
        const newPlayer = new Sound(track.audioUrl, null, (error) => {
            if (error) {
                console.error('❌ Gagal load lagu:', error);
                return;
            }
    
            newPlayer.play((success) => {
                if (success) {
                    dispatch(playNextTrack());  // Kalau lagunya habis, lanjut otomatis
                    console.log("Lagunya habis cik");
                    
                    dispatch(setStopPlayMusic());
                }
            });
            
            setPlayer(newPlayer);  // Simpan player baru ke state
            dispatch(setPlayMusic());
            dispatch(setCurrentTrackIndex(receivedMusicId));
        });
    };
    
    // Trigger play lagu pas track index cocok sama yang diterima dari params
    useEffect(() => {
        const LoadSongMainFunction = async () => {
            if (receivedMusicId !== currentTrackIndex) {
                await dispatch(setPlayerData(queue[receivedMusicId]));
                await loadAndPlayTrack(receivedMusicId);
                console.log("sedang memutar lagu baru : ", currentTrackIndex, "recei : ", receivedMusicId);
            }else {
                console.log("sedang memutar lagu yang sama dengan sebelumnya : ", currentTrackIndex, "recei : ", receivedMusicId);
            }
        };
    
        LoadSongMainFunction();
    
        return cleanupPlayer; // Cleanup pas unmount
    }, [receivedMusicId]);
    
    useEffect(() => {
        console.log("Player : ", player);
    }, [player]);
    
    // Play / Pause handler
    const handlePlayPause = () => {
        if (player) {
            if (isPlaying) {
                player.pause();
                dispatch(setStopPlayMusic());
            } else {
                player.play();
                dispatch(setPlayMusic());
            }
        }
    };
    
    // Ambil setting antrian pas pertama buka
    useEffect(() => {
        const fetchQueueSetting = async () => {
            const saved = await AsyncStorage.getItem('QueQueSelected');
            if (!saved) await AsyncStorage.setItem('QueQueSelected', '1');
            dispatch(setSelectedQueQue(parseInt(saved || '1', 10)));
        };
        fetchQueueSetting();
    }, []);

    const formatTime = (seconds) => {
        const roundedSeconds = Math.floor(seconds);
        const hours = Math.floor(roundedSeconds / 3600);
        const minutes = Math.floor((roundedSeconds % 3600) / 60);
        const remainingSeconds = roundedSeconds % 60;
    
        return hours > 0 
            ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
            : `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    // Bagian Slider function
    useEffect(() => {
        if (player && isPlaying && !hasSliding) {
            const interval = setInterval(() => {
                player.getCurrentTime((seconds) => {
                    dispatch(setPosition(seconds));
                })
            }, 1000)

            return () => clearInterval(interval)
        }
    }, [player, isPlaying, hasSliding]);

    const handleSlidingStart = () => {
        setHasSliding(true)
    }

    const handleSlidingComplete = (value) => {
        setHasSliding(false);
        dispatch(setPosition(value));  
        player.setCurrentTime(value);
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: '60%', width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 90, }}>
                <Image
                    key={receivedMusicId}
                    source={imageUri}
                    onError={() => setImageUri(require('../../assets/images/DefaultMusic.png'))}
                    style={{ height: '75%', width: '80%', borderRadius: 10, resizeMode: 'cover' }}
                />
            </View>

            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15 }}>
                <View style={{ flex: 1}}>
                    <TextTicker
                        style={{ fontFamily: 'Roboto-Bold', fontSize: 20, color: '#Fdfdfd' }}
                        duration={4000}
                        repeatSpacer={100}
                        marqueeDelay={3000}
                        loop
                        animationType='auto'
                    >
                        {playerData?.title ? playerData?.title : 'Unknown Title'}
                    </TextTicker>
                    <Text numberOfLines={1} style={{ fontFamily: 'Roboto-SemiBold', fontSize: 16, color: '#fff', marginTop: 5, opacity: 0.5 }}>
                        {playerData?.artist !== "<unknown>" ? playerData.artist : 'Unknown Artist'}
                    </Text>
                </View> 

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingLeft: 10 }}>
                    <TouchableOpacity onPress={() => console.log("woe bangke")}>
                        <HeartIcon />
                    </TouchableOpacity>
                    <ShareIcon />
                    <PlaylistIcon />
                </View>
            </View>
            <View style={{ height: 70, marginTop: 5 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 18 }}>
                        <Slider
                            style={{ width: '100%' }}
                            minimumValue={0}
                            maximumValue={playerData?.duration}
                            value={position}
                            onValueChange={(value) => dispatch(setPosition(Number(value)))}
                            onSlidingStart={handleSlidingStart}
                            onSlidingComplete={(value) => {handleSlidingComplete(Number(value))}}
                            thumbTintColor='#FFFFFF'
                            minimumTrackTintColor='#F2F2F2'
                            maximumTrackTintColor='#808080'
                            trackStyle={{ height: 2.5, borderRadius: 50 }}
                            thumbStyle={{ height: 12, width: 12 }}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 20 }}>
                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#fdfdfd' }}>{formatTime(position)}</Text>
                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#fdfdfd' }}>{formatTime(playerData?.duration)}</Text>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => ChangeSelectedOptions(dispatch)}>
                        {selectedQueque == 1 ? (
                            <QueueselectedSvg1 />
                        ) : selectedQueque == 3 ? (
                            <QueueselectedSvg2 />
                        ) : (
                            <QueueselectedSvg3 />
                        )}
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                    <View>
                        <TouchableOpacity>
                            <PrevIcon size={24} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={handlePlayPause}>
                        {isPlaying ? (
                            <PauseIcon size={70} />
                        ) : (
                            <PlayIcon size={74} />
                        )}
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                    <View>
                        <TouchableOpacity>
                            <NextIcon size={24} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity>
                        <View>
                            <TimerMusic />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: '10%', width: '100%' }}>

            </View>
        </View>
    );
};

export default PlayMusicScreen;
