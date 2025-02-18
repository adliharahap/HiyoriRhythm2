import { createSlice } from '@reduxjs/toolkit';

const PlaylistTitleSlice = createSlice({
    name: 'playlistTitle',
    initialState : {
        Title : '',
        playlistLength: 0,
    },
    reducers: {
        setPlaylistTitle: (state, action) => {
            state.Title = action.payload;
        },
        setPlaylistLength: (state, action) => {
            state.playlistLength = action.payload;
        }
    },
});

export const { setPlaylistTitle, setPlaylistLength } = PlaylistTitleSlice.actions;
export default PlaylistTitleSlice.reducer;
