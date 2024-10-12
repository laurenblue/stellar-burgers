import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrdersApi } from '@api';
import { TOrder } from '@utils-types';
import { resetConstructor } from './ConstructorReducer';

export interface IOrderState {
  order: TOrder | null;
  ordersHistory: TOrder[] | null;
  orderRequest: boolean;
  orderFailed: boolean;
  ordersHistoryRequest: boolean;
  ordersHistoryFailed: boolean;
}

const initialState: IOrderState = {
  order: null,
  ordersHistory: null,
  orderRequest: false,
  orderFailed: false,
  ordersHistoryRequest: false,
  ordersHistoryFailed: false
};

export const createOrder = createAsyncThunk<TOrder, string[]>(
  'order/create',
  async (ingredients: string[], { dispatch }) => {
    const response = await orderBurgerApi(ingredients);
    dispatch(resetConstructor());
    return response.order;
  }
);

export const fetchUserOrders = createAsyncThunk<TOrder[]>(
  'order/fetchUserOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

const OrderSlice = createSlice({
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
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.ordersHistoryRequest = true;
        state.ordersHistoryFailed = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.ordersHistory = action.payload;
        state.ordersHistoryRequest = false;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.ordersHistoryFailed = true;
        state.ordersHistoryRequest = false;
      });
  }
});

export const { closeModal } = OrderSlice.actions;
export default OrderSlice.reducer;
