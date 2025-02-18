import { configureStore } from '@reduxjs/toolkit';
import audioReducer from './slices/audioSlice';
import modalReducer from './slices/modalSlice';
import trackReducer from './slices/trackSlice';
import lyricReducer from './slices/lyricSlice';
import playlistTitleReducer from './slices/PlaylistTitleSlice';

const store = configureStore({
    reducer: {
        audio: audioReducer,
        modal: modalReducer,
        track: trackReducer,
        lyric: lyricReducer,
        playlistTitle: playlistTitleReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ immutableCheck: { warnAfter: 128 }, serializableCheck: { warnAfter: 128 }}),
});

export default store;