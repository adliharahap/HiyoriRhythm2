import { View, Text, Image, TouchableHighlight } from 'react-native'
import React from 'react'

const LikedSongList = () => {
    return (
        <TouchableHighlight underlayColor="rgba(34,34,34,0.6)" onPress={() => {console.log("p");
        }}>
            <View style={{height: 100, width: '100%', flexDirection: 'row'}}>
                <View style={{width: 110, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../../assets/images/DefaultFavoriteSongs.png')} style={{height: 70, width: 70}} />
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#Fdfdfd"}}>Liked Songs</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Poppins-Regular', fontSize: 14, color: '#cdcdcd'}}>Playlist • 123 Music</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default LikedSongList;