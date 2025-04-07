import { useNavigation } from "@react-navigation/native";
import React  from "react";
import { View, TouchableWithoutFeedback, Text, StyleSheet } from "react-native";
import { Svg, Path } from "react-native-svg";


const HeaderMusic = ({album}) => {
    const navigation = useNavigation();

    return (
        <View style={{height: 130, width: '100%', position: 'absolute', zIndex: 10, top: 0, overflow: 'hidden'}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: "center"}}>
                <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', height: '100%', width:70}}>
                        <TouchableWithoutFeedback onPress={() => {navigation.goBack()}}>
                            <Svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" fill="white" style={{transform: [{rotate: '90deg'}]}}><Path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></Svg>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
                    <View style={{ flexDirection: 'row', gap: 10, justifyContent: "center", alignItems: "center"}}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily: 'Montserrat-SemiBold', fontSize: 18, color: '#ffffff'}}>{album}</Text>
                    </View>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', height: '100%', width:70}}>
                        <Svg height="23" viewBox="0 -960 960 960" width="23" fill="#ffffff">
                            <Path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
                        </Svg>
                    </View>
                </View>
            </View>
        </View>
    );
};
export default HeaderMusic;