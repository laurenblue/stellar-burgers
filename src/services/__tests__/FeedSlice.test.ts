import FeedSlice, { getFeeds } from '../slices/FeedSlice';

describe('Feed Slice', () => {
  const initialState = {
    loading: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null
  };

  it('должен обработать getFeeds.pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = FeedSlice(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обработать getFeeds.fulfilled', () => {
    const feeds = { orders: [{ id: 'order1' }], total: 100, totalToday: 10 };
    const action = { type: getFeeds.fulfilled.type, payload: feeds };
    const state = FeedSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: feeds.orders,
      total: feeds.total,
      totalToday: feeds.totalToday,
      loading: false
    });
  });

  it('должен обработать getFeeds.rejected', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'Error' }
    };
    const state = FeedSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Error'
    });
  });
});
