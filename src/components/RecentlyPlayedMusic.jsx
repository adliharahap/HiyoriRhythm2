import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Svg, Path } from 'react-native-svg';

const RecentlyPlayedMusic = () => {

    return (
        <View style={{width: '100%', position: 'absolute', bottom: 0, zIndex: 3}}>
            <View style={{ flexDirection: 'row', height: 170,}}>
                <View style={{justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15}}>
                    <Image style={{height: 130, width: 110, resizeMode: 'cover', borderRadius: 5}} source={require('../assets/images/test.jpg')} />
                </View>
                <View style={{flex: 1, justifyContent: 'left', alignItems: 'center'}}>
                    <View style={{ width: '100%', paddingTop: 15, paddingBottom: 15}}>
                        <Text style={{fontSize: 20, fontFamily: 'Montserrat-Bold', color: '#fff', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10, paddingBottom: 10}} numberOfLines={1}>
                            Recently Played
                        </Text>
                        <Text style={{fontSize: 16, fontFamily: 'Poppins-Regular', color: '#fdfdfd',textShadowRadius: 10}} numberOfLines={3}>
                            Ariana Grande, The Weeknd - Love Me Harder (Official Lyric Video)
                        </Text>
                    </View>
                    <View style={{flex: 1, width: '100%', alignItems: 'center',justifyContent: 'space-between', paddingRight: 20, flexDirection: 'row'}}>
                        <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 16, fontFamily: 'Montserrat-Medium', color: '#f2f2f2'}}>01 : 46 / 03 : 24</Text>
                        </View>
                        <TouchableOpacity onPress={() => console.log("kont")
                        }>
                            <View style={{width: 100, height: 45, backgroundColor: '#f0008f', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, borderRadius: 30, borderWidth: 1}}>
                                <View>
                                    <Svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#fff"/>
                                    </Svg>
                                </View>
                                <View>
                                    <Text style={{fontSize: 16, fontFamily: 'Roboto-Light', color: "#fff",textShadowRadius: 10}} numberOfLines={3}>
                                        Play
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default RecentlyPlayedMusic;