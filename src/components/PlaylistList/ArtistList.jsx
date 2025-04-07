import { View, Text, TouchableHighlight, Image } from 'react-native'
import React from 'react'

const ArtistList = () => {
    return (
        <TouchableHighlight underlayColor="rgba(34,34,34,0.6)" onPress={() => {console.log("p")}}>
            <View style={{height: 100, width: '100%', flexDirection: 'row'}}>
                <View style={{width: 110, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{overflow: 'hidden', borderRadius: 50}}>
                        <Image source={require('../../assets/images/DefaultArtist.png')} style={{height: 70, width: 70}} />
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Poppins-Medium', fontSize: 18, color: "#Fdfdfd"}}>Liked Songs</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Poppins-Regular', fontSize: 14, color: '#cdcdcd'}}>Playlist • 123 Music</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

export default ArtistList