import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeartIcon from '../../assets/Svg/HeartIcon';
import ShareIcon from '../../assets/Svg/ShareIcon';
import PlaylistIcon from '../../assets/Svg/PlaylistIcon';
import { Slider } from '@miblanchard/react-native-slider';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { ChangeSelectedOptions } from '../../utils/QueueUtils.js/changeSelectedQueque';
import { setPlayMusic, setStopPlayMusic } from '../../redux/slices/audioSlice';
import { QueueselectedSvg1, QueueselectedSvg2, QueueselectedSvg3 } from '../../assets/Svg/QueueselectedSvg';
import { NextIcon, PauseIcon, PlayIcon, PrevIcon, TimerMusic } from '../../assets/Svg/MusicController';
import { playNextTrack, setCurrentTrackIndex, setPlayerData, setPosition } from '../../redux/slices/PlayerSlice';
import TextTicker from 'react-native-text-ticker';
import { fetchQueueSetting, formatTime} from '../../utils/playerUtilsSong';
import audioManager from '../../utils/AudioManager';

const PlayMusicScreen = () => {
    const [imageUri, setImageUri] = useState({ uri: playerData?.imageUrl });
    const [hasSliding, setHasSliding] = useState(false);
    const [player, setPlayer] = useState(null);
    const dispatch = useDispatch();

    const queue = useSelector((state) => state.player.queue);
    const playerData = useSelector((state) => state.player.playerData);
    const position = useSelector((state) => state.player.position);
    const currentTrackIndex = useSelector((state) => state.player.currentTrackIndex);
    const isPlaying = useSelector((state) => state.audio.playMusic);
    const selectedQueque = useSelector((state) => state.audio.selectedQueQue);

    const route = useRoute();
    const receivedMusicId = route.params?.MusicId;

    useEffect(() => {
        setImageUri({ uri: playerData?.imageUrl });
    }, [playerData]);


    //menjalankan lagu pertama kali menggunakan receivedMusicId sebagai index lagu
    useEffect(() => {
        const LoadSongFromListMusicScreen = () => {
            try {
                dispatch(setPlayerData(queue[receivedMusicId]));
    
                const track = queue[receivedMusicId];
                if (track?.audioUrl) {
                    audioManager.loadTrack(
                        track.audioUrl,
                        () => {
                            dispatch(setPlayMusic());
                            console.log("lagu play first");
                            
                        },
                        () => {
                            dispatch(setStopPlayMusic());
                            console.log("Lagu index : ", receivedMusicId, " telah selesai dimuat");
                        }
                    );
                    console.log("Menjalankan Lagu dari ListMusicScreen -> PlayMusicScreen menggunaknan receivedMusicId");
                    dispatch(setCurrentTrackIndex(receivedMusicId));
                }
            }catch (error) {
                console.log("Tidak ada receivedMusicId : ", error);
                
            }
        };
    
        LoadSongFromListMusicScreen();
    
        return () => {
            handleNextTrack();
            // audioManager.stop();
            // Note: Kalau mau biar musik tetep play pas pindah screen, bisa hapus baris ini
        };
    }, [receivedMusicId]);

    useEffect(() => {
        fetchQueueSetting(dispatch);
    }, []);

    useEffect(() => {
        if (!isPlaying || hasSliding) return;
    
        const interval = setInterval(() => {
            audioManager.getCurrentTime((seconds) => {
                dispatch(setPosition(seconds));
            });
        }, 1000);
    
        return () => clearInterval(interval);
    }, [isPlaying, hasSliding]);
    

    const handlePlayPause = () => {
        if (isPlaying) {
            audioManager.pause();
            dispatch(setStopPlayMusic());
        } else {
            audioManager.play();
            dispatch(setPlayMusic());
        }
    };
    

    const handleSlidingStart = () => {
        setHasSliding(true)
    }

    const handleSlidingComplete = (value) => {
        setHasSliding(false);
        dispatch(setPosition(value));  
        audioManager.setCurrentTime(value);
    }

    useEffect(() => {
        console.log("receivedMusicId : ", receivedMusicId);
        console.log("currentTrackIndex : ", currentTrackIndex);
        // console.log("playerData : ", playerData);
        // console.log("queue : ", queue);
    }, [ currentTrackIndex, receivedMusicId]);

    const handleNextTrack = async () => {
        let nextIndex = currentTrackIndex + 1;
        const nextTrack = queue[nextIndex];
    
        console.log("🚀 currentTrackIndex sebelum update:", currentTrackIndex);
        console.log("🎵 Next Index yang akan dimainkan:", nextIndex);
    
        if (!nextTrack) {
            console.log("🚫 Tidak ada lagu berikutnya.");
            return;
        }
    
        try {
            await dispatch(setCurrentTrackIndex(nextIndex)); // Update Redux state
            await dispatch(setPlayerData(nextTrack)); // Update metadata di Redux
    
            setTimeout(() => {
                console.log("✅ Redux Update! currentTrackIndex sekarang:", currentTrackIndex);
            }, 100); // Tambah delay biar Redux sempat update
    
            audioManager.loadTrack(
                nextTrack.audioUrl,
                () => {
                    dispatch(setPlayMusic());
                    console.log("🎶 Lagu baru mulai diputar:", nextTrack.title);
                },
                () => {
                    dispatch(setStopPlayMusic());
                    console.log("⚠️ Lagu selesai dimainkan, lanjut ke next...");
                    setTimeout(() => {
                        handleNextTrack();
                    }, 300);
                }
            );
        } catch (error) {
            console.log("❌ Gagal nextTrack:", error);
        }
    };
    

    const handlePrevTrack = () => {
        if (receivedMusicId > 0) {
            const prevIndex = receivedMusicId - 1;
            const prevTrack = queue[prevIndex];
    
            dispatch(setPlayerData(prevTrack)); // Update metadata lagu di Redux
            dispatch(setCurrentTrackIndex(prevIndex)); // Update index lagu di Redux
    
            audioManager.loadTrack(
                prevTrack.audioUrl,
                () => {
                    dispatch(setPlayMusic());
                },
                () => {
                    dispatch(setStopPlayMusic());
                }
            );
        } else {
            console.log('Udah di lagu pertama~');
        }
    };

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
                        <TouchableOpacity onPress={handlePrevTrack}>
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
                        <TouchableOpacity onPress={handleNextTrack}>
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
