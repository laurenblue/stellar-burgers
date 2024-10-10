import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';
export interface IOrderState {
  order: TOrder | null;
  orderRequest: boolean;
  orderFailed: boolean;
}
const initialState: IOrderState = {
  order: null,
  orderRequest: false,
  orderFailed: false
};
export const createOrder = createAsyncThunk<TOrder, string[]>(
  'order/create',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);
      return response.order;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeModal(state) {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderFailed = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.orderRequest = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderFailed = true;
        state.orderRequest = false;
      });
  }
});

export const { closeModal } = orderSlice.actions;
export default orderSlice.reducer;
