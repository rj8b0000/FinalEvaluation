import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import addressReducer from './addressSlice';

export const todoStore = configureStore({
  reducer: {
    todo: todoReducer,
    address: addressReducer,
  },
});
