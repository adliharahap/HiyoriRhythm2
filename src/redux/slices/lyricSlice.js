import { createSlice } from '@reduxjs/toolkit';

const lyricSlice = createSlice({
    name: 'lyric',
    initialState : {
        lyric : []
    },
    reducers: {
        setLyric: (state, action) => {
            state.lyric = action.payload;
        },
    },
});

export const { setLyric } = lyricSlice.actions;
export default lyricSlice.reducer;
