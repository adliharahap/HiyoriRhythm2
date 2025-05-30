import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { useSelector, useDispatch } from 'react-redux';
import { showModal } from '../redux/slices/modalSlice';

const MusicSortButton = () => {
    const dispatch = useDispatch();
    const sortBy = useSelector((state) => state.audio.sortBy);

    const sortLabels = {
        title: 'Judul',
        artist: 'Artis',
        album: 'Album',
        duration: 'Duration',
        size: 'Size',
        addedDate: 'Terbaru',
    };

    return (
        <TouchableOpacity onPress={() => dispatch(showModal())}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)', width: 80, borderRadius: 30, padding: 8}}>
                <Text style={{fontSize: 14, color: '#fff', fontFamily: 'Roboto-SemiBold'}}>{sortLabels[sortBy] || 'Judul'}</Text>
                <View>
                    <Svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M8.46967 17.5303C8.76256 17.8232 9.23744 17.8232 9.53033 17.5303C9.82322 17.2374 9.82322 16.7626 9.53033 16.4697L8.46967 17.5303ZM6 14V13.25C5.69665 13.25 5.42318 13.4327 5.30709 13.713C5.191 13.9932 5.25517 14.3158 5.46967 14.5303L6 14ZM18 14.75C18.4142 14.75 18.75 14.4142 18.75 14C18.75 13.5858 18.4142 13.25 18 13.25V14.75ZM15.5303 6.46967C15.2374 6.17678 14.7626 6.17678 14.4697 6.46967C14.1768 6.76256 14.1768 7.23744 14.4697 7.53033L15.5303 6.46967ZM18 10V10.75C18.3033 10.75 18.5768 10.5673 18.6929 10.287C18.809 10.0068 18.7448 9.68417 18.5303 9.46967L18 10ZM6 9.25C5.58579 9.25 5.25 9.58579 5.25 10C5.25 10.4142 5.58579 10.75 6 10.75L6 9.25ZM9.53033 16.4697L6.53033 13.4697L5.46967 14.5303L8.46967 17.5303L9.53033 16.4697ZM6 14.75H18V13.25H6V14.75ZM14.4697 7.53033L17.4697 10.5303L18.5303 9.46967L15.5303 6.46967L14.4697 7.53033ZM18 9.25H6L6 10.75H18V9.25Z" fill="#fff"/>
                    </Svg>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default MusicSortButton;