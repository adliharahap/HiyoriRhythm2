import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isVisible: false,
    runSorting : true,
  },
  reducers: {
    showModal: (state) => {
      state.isVisible = true;
    },
    hideModal: (state) => {
      state.isVisible = false;
    },
    setRunSorting: (state) => {
      state.runSorting = true;
    },
    setSortingEnd: (state) => {
      state.runSorting = false;
    }
  },
});

export const { showModal, hideModal, setRunSorting, setSortingEnd } = modalSlice.actions;

export default modalSlice.reducer;
