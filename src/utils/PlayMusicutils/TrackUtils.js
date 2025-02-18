import TrackPlayer from 'react-native-track-player';
import { setCurrentTrack } from '../../redux/slices/trackSlice';
import { setPlayMusicFirstTrue } from '../../redux/slices/audioSlice';

/**
 * Function to update the current track information using Redux.
 * @param {Function} dispatch
 * @param {Function} showNotification - Function to display a notification with track information.
 */
export const updateTrackInfo = async (dispatch, showNotification) => {
    try {
        const trackId = await TrackPlayer.getCurrentTrack();
        const trackObject = await TrackPlayer.getTrack(trackId);

        const { title, artist, duration, artwork, album, size, url } = trackObject;

        // Dispatch Redux action to update the current track information
        dispatch(setCurrentTrack({ title, artist, duration, artwork, album, url }));
        
        dispatch(setPlayMusicFirstTrue());
        // Show notification with track information
        showNotification(title, artist, duration, artwork, album);
    } catch (error) {
        console.error("Error updating track info:", error);
    }
};
