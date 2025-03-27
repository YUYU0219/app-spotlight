import { configureStore } from '@reduxjs/toolkit';
import appsReducer from './appsSlice';

export const store = configureStore({
  reducer: {
    apps: appsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 