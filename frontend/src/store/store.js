import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import hostelReducer from "../features/hostelSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hostels: hostelReducer,
    
  },
});