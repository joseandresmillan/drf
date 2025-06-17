import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  useCases: [],
};

const useCasesSlice = createSlice({
  name: 'useCases',
  initialState,
  reducers: {
    setUseCases(state, action) {
      state.useCases = action.payload;
    },
  },
});

export const { setUseCases } = useCasesSlice.actions;
export default useCasesSlice.reducer;