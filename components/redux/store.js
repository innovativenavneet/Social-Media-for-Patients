import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlices';
import profileReducer from './slices/profileSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
});

export default store;
