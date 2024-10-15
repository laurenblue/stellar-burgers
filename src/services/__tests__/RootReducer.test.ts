import RootReducer from '../reducers/RootReducer';

describe('rootReducer', () => {
  it('должен вернуть initial state при вызове с неопределённым состоянием и неизвестным экшеном', () => {
    const state = RootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual({
      constructorData: { bun: null, ingredients: [] },
      feed: { error: '', loading: false, orders: [], total: 0, totalToday: 0 },
      ingredients: { ingredients: [], loading: false, error: null },
      order: {
        order: null,
        orderFailed: false,
        orderRequest: false,
        ordersHistory: null,
        ordersHistoryFailed: false,
        ordersHistoryRequest: false
      },
      user: { error: '', isAuthorized: false, loading: false, user: null }
    });
  });
});
