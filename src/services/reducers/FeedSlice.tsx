import { getFeedsApi, type TFeedsResponse } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface IFeedState {
  loading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  error?: string | null;
}
const initialState: IFeedState = {
  loading: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: ''
};
const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.orders = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        console.log('API response:', action.payload);
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});
export const getFeeds = createAsyncThunk<TFeedsResponse>('feeds', async () =>
  getFeedsApi()
);

export const { addBun } = feedSlice.actions;
export default feedSlice.reducer;
