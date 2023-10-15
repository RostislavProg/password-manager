import { createSlice } from '@reduxjs/toolkit';
import { EditState } from 'types/slices.ts';

const initialState: EditState = {
  editMode: false,
  selectedUnitId: ""
};

const editSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    changeMode: (state) => {
      state.editMode = !state.editMode;
    },
    select: (state, action) => {
      state.selectedUnitId = action.payload;
    }
  },
});

export const { changeMode, select } = editSlice.actions;

export default editSlice.reducer;