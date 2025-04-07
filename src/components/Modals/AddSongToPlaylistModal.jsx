import { View, Text, ScrollView, Button, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import AddSongToPlaylistList from './AddSongToPlaylistList'
import { useSelector } from 'react-redux'
import { selectTrackUrl } from '../../redux/slices/trackSlice'
import RNFS from 'react-native-fs';
import { getAllPlaylists, getPlaylistData } from '../../utils/PlaylistDatahandler/Playlistutils'


const AddSongToPlaylistModal = ({visible, setVisible}) => {
    const url = useSelector(selectTrackUrl);
    const [playlistData, setPlaylistData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    // Menggunakan useEffect untuk mendapatkan data saat komponen pertama kali dirender
    useEffect(() => {
        getPlaylistData().then((result) => {
            setPlaylistData(result); // Set playlist data
        });
    }, [url, refreshing]);

    // Fungsi untuk merender item playlist
    const renderPlaylistItem = ({ item }) => (
        <AddSongToPlaylistList
            artwork={item.artwork}
            playlistTitle={item.name}
            playlistLength={item.songLength}
            handleRefresh = {handleRefresh}
        />
    );

    const closeModal = () => {
        setVisible(false)
    }

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        await getPlaylistData().then((result) => {
            setPlaylistData(result); // Set playlist data
        });
        setRefreshing(false);
    }, []);

    return (
        <Modal
            isVisible={visible}
            style={{margin: 0}}
            onBackButtonPress={() => closeModal()}
        >
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                <View style={{flex: 1, backgroundColor: 'rgba(44, 26, 77, 0.95)', width: '100%', marginTop: 300, borderTopLeftRadius: 30, borderTopRightRadius: 30, minHeight: 600}}>
                    <View style={{flex: 1}}>
                        <View style={{height: 130, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 24, color: '#fdfdfd'}}>Add To Playlist</Text>
                        </View>
                        <View style={{flex: 1}}>
                            {playlistData && (
                                <FlatList
                                    scrollEnabled={false}
                                    data={playlistData} // Data yang akan di-mapping
                                    keyExtractor={(item, index) => index.toString()} // Setiap item harus memiliki key unik
                                    renderItem={renderPlaylistItem} // Panggil fungsi render untuk setiap item
                                    refreshing={refreshing}
                                    onRefresh={handleRefresh}
                                />
                            )}
                        </View>
                    </View>
                    <View style={{position: 'absolute', width: '100%', bottom: 0, zIndex: 9}}>
                        <TouchableOpacity onPress={closeModal}>
                            <View style={{width: '100%', paddingVertical: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(15,15,15,0.8)'}}>
                                <Text style={{color: '#fff', fontFamily: 'Roboto-Medium', fontSize: 16}}>close</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    )
}

export default AddSongToPlaylistModal