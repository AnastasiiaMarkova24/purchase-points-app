import { configureStore } from '@reduxjs/toolkit';
import purchaseReducer from '../features/purchase/purchaseSlice';

export const store = configureStore({
  reducer: {
    purchase: purchaseReducer,
  },
});
