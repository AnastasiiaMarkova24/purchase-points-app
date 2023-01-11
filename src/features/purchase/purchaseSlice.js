import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { fetchPurchaseHistoryData } from './purchaseAPI';
import { TOTAL } from './purchaseConstants';
import { formatHistoryData } from './purchaseUtils';

const initialState = {
  isLoading: false,
  purchaseHistory: [],
  filteredData: [],
};

export const fetchPurchaseHistory = createAsyncThunk('purchase/fetchPurchaseHistoryData', async amount => {
  return await fetchPurchaseHistoryData(amount);
});

export const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    filterData: (state, action) => {
      const selectedTab = action.payload;
      const filteredData = [...state.purchaseHistory].map(x => ({
        ...x,
        purchases:
          selectedTab === TOTAL
            ? x.purchases
            : x.purchases.filter(y => moment(y.date).isSame(moment(selectedTab), 'month')),
      }));
      state.filteredData = filteredData;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPurchaseHistory.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchPurchaseHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.purchaseHistory = action.payload;
        state.filteredData = action.payload;
      });
  },
});

export const selectPurchaseHistory = state => formatHistoryData(state.purchase.purchaseHistory);
export const selectFilteredData = state => formatHistoryData(state.purchase.filteredData);
export const selectIsLoading = state => state.purchase.isLoading;

export const { filterData } = purchaseSlice.actions;

export default purchaseSlice.reducer;
