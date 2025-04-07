import { View, Text, TextInput, Button, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal';
import { addNewPlaylist, getAllPlaylists } from '../../utils/PlaylistDatahandler/Playlistutils';

const AddNewPlaylistModal = ({modalVisibel, setModalVisibel, handleRefresh}) => {
    const [borderfocus, setborderfocus] = useState('#fdfdfd');
    const [NameInputValue, setNameInputValue] = useState('');

    const newPlaylist = async() => {
        await addNewPlaylist(NameInputValue);
        getAllPlaylists();
        setTimeout(() => {
            setNameInputValue('');
            setModalVisibel(false);
            handleRefresh();
        }, 1000);
    }

    return (
        <Modal
            isVisible={modalVisibel}
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
            <View style={{backgroundColor: '#2c1a4d',padding: 20,borderRadius: 40, alignItems: 'center',}}>
                <View style={{height: 200, width: '100%', position: 'relative'}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', gap: 30}}>
                        <Text style={{fontFamily: 'Roboto-Medium', fontSize: 20, color: '#fdfdfd'}}>Add New Playlist</Text>
                        <TextInput autoCorrect={true} value={NameInputValue} maxLength={30} onChangeText={setNameInputValue} placeholder='New Name Playlist' selectionColor={'rgba(44, 26, 77, 0.6)'} textAlignVertical='center' style={{borderColor: borderfocus, borderWidth: 1.2, color: '#fff', width: '100%', borderRadius: 50, paddingHorizontal: 10, fontFamily: 'Montserrat-Medium', fontSize: 14, paddingVertical: 5, backgroundColor: 'rgba(255,255,255,0.2)'}} onFocus={() => {setborderfocus('#cccccc')}} onBlur={() => {setborderfocus('#fdfdfd')}} />
                        <View style={{flexDirection: 'row', gap: 10, width: '100%', justifyContent: 'flex-end', paddingHorizontal: 10}}>
                            <TouchableOpacity onPress={() => {setModalVisibel(false)}}>
                                <View style={{paddingHorizontal: 30, paddingVertical: 10, backgroundColor: '#C62828', borderRadius: 50, borderWidth: 1.1, borderColor: '#cccccc'}}>
                                    <Text style={{fontFamily: 'Roboto-Medium', color: 'white', fontSize: 14}}>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={newPlaylist}>
                                <View style={{paddingHorizontal: 30, paddingVertical: 10, backgroundColor: '#32cd32', borderRadius: 50, borderWidth: 1.1, borderColor: '#cccccc'}}>
                                    <Text style={{fontFamily: 'Roboto-Medium', color: 'white', fontSize: 14}}>Ok</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AddNewPlaylistModal;