import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: '',
    artist: '',
    artwork: '',
    duration: '',
    album: '',
    url: '',
};

const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {
        setCurrentTrack: (state, action) => {
            const { title, artist, duration, artwork, album, url} = action.payload;
            state.title = title;
            state.artist = artist;
            state.duration = duration;
            state.artwork = artwork;
            state.album = album;
            state.url = url;
        },
    },
});

// Selectors
export const selectTrackTitle = (state) => state.track.title;
export const selectTrackArtist = (state) => state.track.artist;
export const selectTrackArtwork = (state) => state.track.artwork;
export const selectTrackDuration = (state) => state.track.duration;
export const selectTrackAlbum = (state) => state.track.album;
export const selectCurrentTrack = (state) => state.track;
export const selectTrackUrl = (state) => state.track.url;

export const { setCurrentTrack } = trackSlice.actions;
export default trackSlice.reducer;
