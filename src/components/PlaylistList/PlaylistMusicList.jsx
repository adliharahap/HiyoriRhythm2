import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Svg, Path } from 'react-native-svg';
import TrackPlayer, { useTrackPlayerEvents, Event} from 'react-native-track-player';
import { convertMillisecondsToMinutes } from '../../utils/FormatUtils.js/ConvertMiliSecondToMinutes';

const PlaylistMusicList = (props) => {
    const {id, img, title, artist, album, duration, path, filedate, filesize} = props;
    const [textcolor, settextcolor] = useState(false);

    // format duration
    let formatDuration = convertMillisecondsToMinutes(duration);
    const artistNameAvailable = artist === "<unknown>" ? "Unknown Artist" : artist;

    const updateTrackInfo = async () => {
        let trackIndex = await TrackPlayer.getCurrentTrack();
        
        if (trackIndex == id) {
            settextcolor(true);
        }else {
            settextcolor(false);
        }
    };

    useEffect(()=> {
        updateTrackInfo();
        console.log(img);
    }, [])

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
        // Saat lagu berikutnya diputar, perbarui informasi lagu
        updateTrackInfo();
    });

    return (
        <View style={{height: 70, width: '100%', flexDirection: "row", marginBottom: 10}}>
            <View style={{width: 70, justifyContent: "center", alignItems: "center"}}>
                {img === 'content://media/external/audio/albumart/1' ? 
                (
                    <Image style={{height: 45, width: 45, borderRadius: 5}} source={require('../../assets/images/DefaultMusic.png')} />
                ) : (
                    <Image style={{height: 45, width: 45, borderRadius: 5}} source={{uri: img}} />
                )}
            </View>
            <View style={{flex: 1, justifyContent: "center"}}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Roboto-Regular', fontSize: 14, color: textcolor ? "#FFFF00" : "#FFFFFF"}}>{title}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Roboto-Regular', fontSize: 12, color: '#808080'}}>{artistNameAvailable} • {album}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Roboto-Regular', fontSize: 12, color: '#808080'}}>{formatDuration}</Text>
            </View>
            <TouchableWithoutFeedback onPress={()=> {console.log(typeof id);}}>
                <View style={{width: 40, alignItems: "center", justifyContent: "center"}}>
                    <Svg height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff"><Path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></Svg>
                </View>
            </TouchableWithoutFeedback>
        </View>    
    );
};

export default PlaylistMusicList;