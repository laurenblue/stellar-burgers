import OrderSlice, { createOrder, fetchUserOrders } from '../slices/OrderSlice';

const initialState = {
  order: null,
  ordersHistory: null,
  orderRequest: false,
  orderFailed: false,
  ordersHistoryRequest: false,
  ordersHistoryFailed: false
};

describe('Order Slice', () => {
  it('должен обработать createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = OrderSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderRequest: true,
      orderFailed: false
    });
  });

  it('должен обработать createOrder.fulfilled', () => {
    const order = { id: '123', ingredients: [] };
    const action = { type: createOrder.fulfilled.type, payload: order };
    const state = OrderSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      order,
      orderRequest: false
    });
  });

  it('должен обработать createOrder.rejected', () => {
    const action = { type: createOrder.rejected.type };
    const state = OrderSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      orderFailed: true
    });
  });

  it('должен обработать fetchUserOrders.fulfilled', () => {
    const ordersHistory = [{ id: 'order1' }, { id: 'order2' }];
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: ordersHistory
    };
    const state = OrderSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ordersHistory,
      ordersHistoryRequest: false
    });
  });
});
