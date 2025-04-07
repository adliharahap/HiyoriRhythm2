import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Svg, Path } from 'react-native-svg';
import { convertMillisecondsToMinutes } from '../utils/FormatUtils.js/ConvertMiliSecondToMinutes';
import { useSelector } from 'react-redux';
import Sound from 'react-native-sound';

const MusicList = (props) => {
    const { id, img, title, artist, album, duration, path, filedate, filesize } = props;
    const [textcolor, setTextcolor] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [imageUri, setImageUri] = useState({ uri: img });
    const currentTrackIndex = useSelector((state) => state.player.currentTrackIndex);

    // Tiap props.img berubah, update imageUri
    useEffect(() => {
        setImageUri({ uri: img });
    }, [img]);

    const sortBy = useSelector((state) => state.audio.sortBy);

    const sortLabels = {
        size: ` • ${bytesToMB(filesize)} MB`,
        addedDate: ` • ${new Date(filedate * 1000).toISOString().slice(0, 19).replace('T', ' ')}`,
    };

    function bytesToMB(bytes) {
        return (bytes / (1024 * 1024)).toFixed(1);
    }

    const formatDuration = convertMillisecondsToMinutes(duration);
    const artistNameAvailable = artist === "<unknown>" ? "Unknown Artist" : artist;

    useEffect(() => {
        if (currentTrackIndex === id) {
            setTextcolor(true);
        } else {
            setTextcolor(false);
        }
    }, [currentTrack]);

    const handlePress = (path) => {
        if (currentTrack) {
            if (currentTrack.isPlaying()) {
                currentTrack.pause();
            } else {
                currentTrack.play((success) => {
                    if (!success) {
                        console.log('Playback failed');
                    }
                });
            }
        } else {
            const sound = new Sound(path, '', (error) => {
                if (!error) {
                    setCurrentTrack(sound);
                    sound.play();
                }
            });
        }
    };

    return (
        <View style={{ height: 70, width: '100%', flexDirection: 'row', marginBottom: 10 }}>
            <View style={{ width: 70, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    key={id} // 👈 Paksa render ulang kalau beda lagu
                    style={{ height: 45, width: 45, borderRadius: 5 }}
                    source={imageUri}
                    onError={() => setImageUri(require('../assets/images/DefaultMusic.png'))}
                />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontFamily: 'Roboto-Regular', fontSize: 14, color: textcolor ? '#FFFF00' : '#FFFFFF' }}>
                    {title}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontFamily: 'Roboto-Regular', fontSize: 12, color: '#808080' }}>
                    {artistNameAvailable} • {album}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontFamily: 'Roboto-Regular', fontSize: 12, color: '#808080' }}>
                    {formatDuration} {sortLabels[sortBy] || ''}
                </Text>
            </View>
            <TouchableWithoutFeedback onPress={() => console.log(typeof id)}>
                <View style={{ width: 40, alignItems: 'center', justifyContent: 'center' }}>
                    <Svg height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff">
                        <Path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
                    </Svg>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default MusicList;
