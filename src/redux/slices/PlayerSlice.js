import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    queue: [],               // Daftar lagu
    currentTrackIndex: 0,     // Indeks lagu yang sedang diputar
    playerData: [],           // Data lengkap lagu yang diputar
    player: null,              // Instance player (misal Sound object)
    isPlaying: false,         // Status lagi play atau pause
    position: 0,               // Posisi waktu lagu saat ini
    duration: 0,               // Durasi total lagu
    hasSliding: false          // Buat handle pas slider di-drag
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setQueue: (state, action) => {
            state.queue = action.payload;
        },
        setCurrentTrackIndex: (state, action) => {
            console.log("🎯 setCurrentTrackIndex DI REDUCER:", action.payload);
            state.currentTrackIndex = action.payload;
        },
        setPlayerData: (state, action) => {
            state.playerData = action.payload;
        },
        setPlayer: (state, action) => {
            state.player = action.payload;  // Set player instance (Sound object atau Audio)
        },
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;  // true / false
        },
        setPosition: (state, action) => {
            state.position = action.payload;  // posisi detik saat ini
        },
        setDuration: (state, action) => {
            state.duration = action.payload;  // durasi total lagu
        },
        setHasSliding: (state, action) => {
            state.hasSliding = action.payload;  // true pas slider di drag
        },
        resetPlayerState: (state) => {
            state.player = null;
            state.isPlaying = false;
            state.position = 0;
            state.duration = 0;
            state.hasSliding = false;
        }
    }
});

export const {
    setQueue,
    setCurrentTrackIndex,
    setPlayerData,
    setPlayer,
    setIsPlaying,
    setPosition,
    setDuration,
    setHasSliding,
    resetPlayerState
} = playerSlice.actions;

export default playerSlice.reducer;
