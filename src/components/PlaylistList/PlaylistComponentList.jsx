import { View, Text, ScrollView, StatusBar, ImageBackground, TouchableOpacity, FlatList, TouchableHighlight, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderComponentPlaylistList from './HeaderComponentPlaylistList';
import { Path, Svg } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { getAllPlaylistSongs } from '../../utils/PlaylistDatahandler/getAllPlaylistSongsData';
import { mergePlaylistAndStorageData } from '../../utils/PlaylistDatahandler/MergePlaylistDataAndAllMusic';
import PlaylistMusicList from './PlaylistMusicList';

const PlaylistComponentList = ({setPlaylistClick}) => {
    const MusicFiles = useSelector((state) => state.audio.files);
    const titlePlaylist = useSelector((state) => state.playlistTitle.Title);
    const playlistLength = useSelector((state) => state.playlistTitle.playlistLength);

    const [PlaylistData, setPlaylistData] = useState([]);

    const getAllDataPlaylist = async() => {
        try {
            const getDatabaseDataPlaylist = await getAllPlaylistSongs();
            if (getDatabaseDataPlaylist) {
                const result = await mergePlaylistAndStorageData(titlePlaylist ,MusicFiles, getDatabaseDataPlaylist);
                await setPlaylistData(result);
            }
        } catch (error) {
            console.log('error cik : ', error);
            
        }
    }

    useEffect(() => {
        getAllDataPlaylist();
    }, [titlePlaylist]);

    const renderItem = ({ item, index }) => {

        return (
            <TouchableHighlight underlayColor="rgba(34,34,34,0.6)"  onPress={() => {
                
                navigation.navigate('MusicPlay', { MusicId: index})
                }}>
                <PlaylistMusicList
                    id={index}
                    img={item.imageUrl} 
                    title={item.title} 
                    artist={item.artist} 
                    album={item.album} 
                    duration={item.duration} 
                    path={item.audioUrl} 
                    filedate={item.addedDate} 
                    filesize={item.size}
                />
            </TouchableHighlight>
        );
    };

    useEffect(() => {
        const backAction = () => {
            setPlaylistClick(false);
            return true; // Kembalikan true agar navigasi tidak berjalan
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
        return () => {
          backHandler.remove(); // Bersihkan listener saat komponen di-unmount
        };
    }, []);
    

    return (
        <ScrollView style={{flex: 1, width: '100%'}}>
            <StatusBar backgroundColor="transparent" translucent />
            <ImageBackground source={require('../../assets/images/test.jpg')} style={{height: 250, width: '100%', backgroundColor: '#ddd', position: 'relative'}}>
                <HeaderComponentPlaylistList setPlaylistClick={setPlaylistClick} />
            </ImageBackground>
            <View style={{flex: 1, width: '100%', paddingBottom: 150}}>
                <View style={{width: '100%', maxHeigh: 150, paddingRight: '20%', paddingLeft: 15, paddingVertical: 10}}>
                    <Text numberOfLines={2} style={{fontFamily: 'Poppins-Bold', fontSize: 26, color: '#fdfdfd'}}>{titlePlaylist}</Text>
                </View>
                <View style={{minHeight: 150}}>
                    <Text numberOfLines={1} style={{fontFamily: 'Roboto-Medium', fontSize: 15, color: '#fff', paddingHorizontal: 10, textAlign:'justify'}}>{playlistLength} Music Saves</Text>
                    <Text numberOfLines={5} style={{fontFamily: 'Roboto-Regular', fontSize: 14, color: '#cdcdcd', paddingHorizontal: 10, paddingVertical: 10, textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur vel inventore eveniet quo mollitia. Consectetur maiores non, asperiores reprehenderit vitae velit eum. Voluptates sed quidem fuga soluta et eius dolore nisi, natus, sapiente, at quis molestiae impedit qui animi laboriosam velit voluptatum beatae minus! Atque magnam sunt ab pariatur facilis!</Text>
                    <View style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 10, paddingBottom: 15, paddingHorizontal: 20}}>
                        <View style={{width: 120, height: 36, borderWidth: 1.1, borderColor: '#fdfdfd', borderRadius: 50, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 14, color: '#fdfdfd'}}>Show More</Text>
                        </View>
                    </View>
                </View>
                <View style={{width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, flexDirection: 'row', paddingHorizontal: 20, paddingBottom: 30}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            <Svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30" fill="#FFFFFF" style={{transform: [{rotate: '90deg'}]}}><Path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></Svg>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <View style={{width: 100, height: 50, backgroundColor: '#FFDF00', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, borderRadius: 30, borderWidth: 1}}>
                            <View>
                                <Svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#1C274C"/>
                                </Svg>
                            </View>
                            <View>
                                <Text style={{fontSize: 16, fontFamily: 'Roboto-Light', color: "#1C274C",textShadowRadius: 10}} numberOfLines={3}>
                                    Play
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                    {PlaylistData && (
                        <FlatList
                        scrollEnabled={false}
                        data={PlaylistData}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    )}
                </View>
            </View>        
        </ScrollView>
    );
};

export default PlaylistComponentList;