import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { Svg, Path } from 'react-native-svg'

const HeaderComponentPlaylistList = ({setPlaylistClick}) => {
    return (
        <View style={{height: 130, width: '100%', position: 'absolute', zIndex: 10, top: 0, overflow: 'hidden'}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: "center"}}>
                <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', height: '100%', width:70}}>
                        <TouchableWithoutFeedback onPress={() => {setPlaylistClick(false)}}>
                            <Svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 -960 960 960" width="36" fill="white" style={{transform: [{rotate: '180deg'}]}}><Path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></Svg>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default HeaderComponentPlaylistList