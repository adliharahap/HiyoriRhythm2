
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSelectedQueQue } from '../redux/slices/audioSlice';

// Fetch & Set Antrian Queue (dari storage)
export const fetchQueueSetting = async (dispatch) => {
    const saved = await AsyncStorage.getItem('QueQueSelected');
    if (!saved) await AsyncStorage.setItem('QueQueSelected', '1');
    dispatch(setSelectedQueQue(parseInt(saved || '1', 10)));
};

// Format Waktu
export const formatTime = (seconds) => {
    const roundedSeconds = Math.floor(seconds);
    const hours = Math.floor(roundedSeconds / 3600);
    const minutes = Math.floor((roundedSeconds % 3600) / 60);
    const remainingSeconds = roundedSeconds % 60;

    return hours > 0
        ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
        : `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

