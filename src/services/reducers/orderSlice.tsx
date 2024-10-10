import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrdersApi } from '@api';
import { TOrder } from '@utils-types';
import { resetConstructor } from './ConstructorReducer';
export interface IOrderState {
  order: TOrder | null;
  ordersHistory: TOrder[] | null;
  orderRequest: boolean;
  orderFailed: boolean;
  ordersHistoryRequest: boolean; // Запрос истории заказов
  ordersHistoryFailed: boolean; // Ошибка запроса истории заказов
}
const initialState: IOrderState = {
  order: null,
  ordersHistory: null, // Изначально история заказов пустая
  orderRequest: false,
  orderFailed: false,
  ordersHistoryRequest: false,
  ordersHistoryFailed: false
};
export const createOrder = createAsyncThunk<TOrder, string[]>(
  'order/create',
  async (ingredients: string[], { dispatch, rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);
      dispatch(resetConstructor());
      return response.order;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUserOrders = createAsyncThunk<TOrder[]>(
  'order/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi(); // Получаем заказы
      return orders;
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
      })
      // Добавляем обработку экшенов для истории заказов
      .addCase(fetchUserOrders.pending, (state) => {
        state.ordersHistoryRequest = true;
        state.ordersHistoryFailed = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.ordersHistory = action.payload; // Сохраняем полученные заказы
        state.ordersHistoryRequest = false;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.ordersHistoryFailed = true;
        state.ordersHistoryRequest = false;
      });
  }
});

export const { closeModal } = orderSlice.actions;
export default orderSlice.reducer;
