import TrackPlayer, { RepeatMode } from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { setSelectedQueQue } from '../../redux/slices/audioSlice';

export const ChangeSelectedOptions = async (dispatch) => {
    const getvalue = await AsyncStorage.getItem('QueQueSelected');
    const selectedvalue = parseInt(getvalue, 10);

    try {
        if (selectedvalue === 3) {
            await AsyncStorage.setItem('QueQueSelected', '1');
            await TrackPlayer.setRepeatMode(RepeatMode.Off);
            dispatch(setSelectedQueQue(1));
            ToastAndroid.showWithGravityAndOffset(
                'Pemutaran Berurut',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                0,
                390
            );
        } else if (selectedvalue === 2) {
            await AsyncStorage.setItem('QueQueSelected', '3');
            await TrackPlayer.setRepeatMode(RepeatMode.Track);
            dispatch(setSelectedQueQue(3));
            ToastAndroid.showWithGravityAndOffset(
                'Ulangi Music',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                0,
                390
            );
        } else if (selectedvalue === 1) {
            await AsyncStorage.setItem('QueQueSelected', '2');
            await TrackPlayer.setRepeatMode(RepeatMode.Off);
            dispatch(setSelectedQueQue(2));
            ToastAndroid.showWithGravityAndOffset(
                'Pemutaran Acak',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                0,
                390
            );
        }
    } catch (error) {
        console.error(error);
    }
};
