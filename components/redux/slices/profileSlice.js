// profileSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  image: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { setProfileImage } = profileSlice.actions;
export default profileSlice.reducer;
