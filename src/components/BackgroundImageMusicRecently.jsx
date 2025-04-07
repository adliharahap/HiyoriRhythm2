import { View, Image, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { Svg, Path } from 'react-native-svg'

const BackgroundImageMusicRecently = () => {

    return (
        <>
        <View style={{height: 300, width: '100%', position: 'absolute', top: 0, zIndex: 0}}>
            <Image source={require('../assets/images/Onboarding/Slide1.jpg')} style={{height: 300, width: '100%', resizeMode: 'cover'}} blurRadius={0.5} />
            {/* <View style={{height: 60, width: '100%', position: 'absolute', top: 0, flexDirection: 'row', paddingVertical: 10}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 22, fontFamily: 'Montserrat-Bold', color: '#fff', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10}}>Hiyori Rhythm</Text>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', paddingRight: 20, gap: 20}}>
                        <TouchableOpacity onPress={() => {console.log("p kont");
                        }}>
                            <View style={{ backgroundColor: 'rgba(200,200,200,0.6)', height: 30, width: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 50,}}>
                                <Svg height="22" viewBox="0 -960 960 960" width="22" fill="#f2f2f2"><Path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></Svg>
                            </View>
                        </TouchableOpacity>
                        <View style={{ backgroundColor: 'rgba(200,200,200,0.6)', height: 30, width: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 50}}>
                            <Svg height="22" viewBox="0 -960 960 960" width="22" fill="#f2f2f2"><Path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></Svg>
                        </View>
                    </View>
                </View>
            </View> */}
        </View>
    </>
    );
};

export default BackgroundImageMusicRecently;