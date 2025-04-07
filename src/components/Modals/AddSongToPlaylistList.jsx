import { View, Text, TouchableHighlight, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Circle, Path, Rect, Svg } from 'react-native-svg'
import { isSongInPlaylists } from '../../utils/PlaylistDatahandler/isSongInPlaylist'
import { useSelector } from 'react-redux'
import { selectTrackArtist, selectTrackTitle, selectTrackUrl } from '../../redux/slices/trackSlice'
import { addSongToPlaylist, removeSongFromPlaylist } from '../../utils/PlaylistDatahandler/Playlistutils'

const AddSongToPlaylistList = ({artwork, playlistTitle, playlistLength, handleRefresh}) => {
    const [isSongInPlaylisthas, setIsSongInPlaylisthas] = useState({});

    const title = useSelector(selectTrackTitle);
    const artist = useSelector(selectTrackArtist);
    const url = useSelector(selectTrackUrl);

    useEffect(() => {
        checkSongInPlaylist();
    }, [url]);

    const checkSongInPlaylist = async() => {
        try {
            const checkPathSong = await isSongInPlaylists(url);
            setIsSongInPlaylisthas(checkPathSong);
            console.log('Is song in playlist:', checkPathSong);
        } catch (error) {
            console.error('Error checking song in playlist:', error);
        }
        handleRefresh();
    };

    const addSongToSelectedPlaylist = async() => {
        try {
            const isFound = await isSongInPlaylists(url);

            const songData = {
                Title: title,
                Artist: artist,
                Path: url,
            };

            if (isFound) {

                if(isPlaylistTrue) {
                    try {
                        const result = await removeSongFromPlaylist(playlistTitle, songData);
                        if (result) {
                            checkSongInPlaylist();
                            ToastAndroid.showWithGravityAndOffset(
                                `Remove song from playlist ${playlistTitle}`,
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER,
                                0,
                                600
                            );
                        }
                    } catch (error) {
                        console.log("error remove song From playlist : ", error );
                        
                    }
                }else{
                    try {
                        
                        const result = await addSongToPlaylist(playlistTitle, songData);
                        if (result) {
                            console.log('Song successfully added to the playlist.');
                            checkSongInPlaylist();
                            ToastAndroid.showWithGravityAndOffset(
                                `Song added to playlist ${playlistTitle}`,
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER,
                                0,
                                600
                            );
                        } else {
                            console.log('Song is already in the playlist or playlist not found.');
                        }
                    } catch (error) {
                        console.error('Failed to add song to playlist 1:', error);

                    }
                }
            } else {
                console.log('The song path is not found in any playlists.');
                try {
                    const songData = {
                        Title: title,
                        Artist: artist,
                        Path: url,
                    };
                    const result = await addSongToPlaylist(playlistTitle, songData);
                    if (result) {
                        console.log('Song successfully added to the playlist.');
                    } else {
                        console.log('Song is already in the playlist or playlist not found.');
                    }
                } catch (error) {
                    console.error('Failed to add song to playlist 2:', error);
                }
            }
            handleRefresh();
        } catch (error) {
            console.error('Failed to check song path in playlists:', error);
        }
    };

    const isPlaylistTrue = isSongInPlaylisthas[playlistTitle] === true;

    return (
        <TouchableOpacity onPress={addSongToSelectedPlaylist}>
            <View style={{height: 100, width: '100%', flexDirection: 'row'}}>
                <View style={{width: 110, justifyContent: 'center', alignItems: 'center'}}>
                    {artwork ? (
                        <Image source={{uri: artwork}} style={{height: 70, width: 70}} />
                    ) : (
                        <Image source={require('../../assets/images/DefaultPlaylist.png')} style={{height: 70, width: 70}} />
                    )}
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#Fdfdfd"}}>{playlistTitle}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Poppins-Regular', fontSize: 14, color: '#cdcdcd'}}>Playlist • {playlistLength} Music</Text>
                </View>
                <View style={{width: 60, height: '100%', justifyContent: 'center'}}>
                    {isPlaylistTrue && (
                        <Svg width="30" height="30" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <Rect width="32" height="32" x="0.05" fill="none" />
                            <Circle cx="16.05" cy="15.59" r="13.72" fill="#2c1a4d" />
                            <Path d="M16.05,30.31A14.72,14.72,0,1,1,30.77,15.59,14.74,14.74,0,0,1,16.05,30.31Zm0-27.43A12.72,12.72,0,1,0,28.77,15.59,12.73,12.73,0,0,0,16.05,2.88Z" fill="#0EF700" />
                            <Circle cx="16.05" cy="15.59" r="9.82" fill="#2c1a4d" />
                            <Path d="M16.05,26.41A10.82,10.82,0,1,1,26.87,15.59,10.83,10.83,0,0,1,16.05,26.41Zm0-19.64a8.82,8.82,0,1,0,8.82,8.82A8.83,8.83,0,0,0,16.05,6.77Z" fill="#0EF700" />
                            <Path d="M14.43,19.69a1,1,0,0,1-.61-.22l-2.88-2.25a1,1,0,1,1,1.23-1.57l2.18,1.7,5.49-5.56a1,1,0,0,1,1.42,1.41l-6.12,6.19A1,1,0,0,1,14.43,19.69Z" fill="#0EF700" />
                        </Svg>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default AddSongToPlaylistList;