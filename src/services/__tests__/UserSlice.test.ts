import UserSlice, { loginUser } from '../slices/UserSlice';

const initialState = {
  user: null,
  isAuthorized: false,
  loading: false,
  error: ''
};

describe('User Slice', () => {
  it('должен обработать loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = UserSlice(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe('');
  });

  it('должен обработать loginUser.fulfilled', () => {
    const user = { id: 'user123', email: 'test@test.com' };
    const action = { type: loginUser.fulfilled.type, payload: user };
    const state = UserSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user,
      isAuthorized: true,
      loading: false
    });
  });

  it('должен обработать loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = UserSlice(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'Error',
      isAuthorized: false,
      loading: false
    });
  });
});
