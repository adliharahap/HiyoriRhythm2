import { createSlice } from '@reduxjs/toolkit';

export const audioSlice = createSlice({
  name: 'audio',
  initialState: {
    files: [],
    shuffledArray: [],
    sortBy: 'title', // nilai default
    sortOrder: 'asc', // nilai default
    selectedQueQue: 1,
    playMusic: null,
    playFirst: false,
  },
  reducers: {
    setAudioFiles: (state, action) => {
      state.files = action.payload;
    },
    setShuffledArray: (state, action) => {
      state.shuffledArray = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setSelectedQueQue: (state, action) => {
      state.selectedQueQue = action.payload;
    },
    setPlayMusic: (state) => {
      state.playMusic = true;
    },
    setStopPlayMusic: (state) => {
      state.playMusic = false;
    },
    setPlayMusicFirstTrue: (state) => {
      state.playFirst = true;
    }
  },
});

export const { setAudioFiles, setShuffledArray, setSortBy, setSortOrder, setSelectedQueQue, setPlayMusic, setStopPlayMusic, setPlayMusicFirstTrue } = audioSlice.actions;

export default audioSlice.reducer;
