import { View, StatusBar, SafeAreaView, ImageBackground, StyleSheet, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import HeaderMusic from '../../components/HeaderMusic';
import { useSelector } from 'react-redux';
import PlayMusicScreen from './PlayMusicScreen';
import LyricsScreen from './LyricsScreen';
import LinearGradient from 'react-native-linear-gradient';

const PlayMusicLyrics = () => {

    const PlayerData = useSelector((state) => state.player.playerData);
    const width = Dimensions.get('window').width;

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#0d0d0d'}}>
            <StatusBar backgroundColor="transparent" translucent />
            <HeaderMusic  album={PlayerData?.album}/>
            <LinearGradient style={styles.containerStyle} colors={['#2c1a4d', '#000']}   start={{x: 0.5, y: 0}} end={{x: 0.5, y: 1}} locations={[0.5, 1]} pointerEvents="box-none">
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={{flex: 1}}
                >
                    <View style={{width, flex: 1}}>
                        <PlayMusicScreen />
                    </View>
                    <View style={{width, flex: 1}}>
                        <LyricsScreen />
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        width : '100%',
    },
});

export default PlayMusicLyrics;
