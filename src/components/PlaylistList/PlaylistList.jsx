import { View, Text, TouchableHighlight, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylistLength, setPlaylistTitle } from '../../redux/slices/PlaylistTitleSlice';

const PlaylistList = ({artwork, playlistTitle, playlistLength, setPlaylistClick}) => {
    const dispatch = useDispatch();

    const playlistClicked = async() => {
        await dispatch(setPlaylistTitle(playlistTitle));
        await dispatch(setPlaylistLength(playlistLength));
        setPlaylistClick(true)
    }

    return (
        <TouchableHighlight underlayColor="rgba(34,34,34,0.6)" onPress={playlistClicked}>
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
            </View>
        </TouchableHighlight>
    )
}

export default PlaylistList