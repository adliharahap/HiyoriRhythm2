import { configureStore } from '@reduxjs/toolkit';
import audioReducer from './slices/audioSlice';
import modalReducer from './slices/modalSlice';
import lyricReducer from './slices/lyricSlice';
import playlistTitleReducer from './slices/PlaylistTitleSlice';
import playerReducer from './slices/PlayerSlice';

const store = configureStore({
    reducer: {
        audio: audioReducer,
        modal: modalReducer,
        lyric: lyricReducer,
        playlistTitle: playlistTitleReducer,
        player: playerReducer, 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ immutableCheck: { warnAfter: 128 }, serializableCheck: { warnAfter: 128 }}),
});

export default store;