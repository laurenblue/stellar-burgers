import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  TUserResponse,
  TRegisterData,
  registerUserApi,
  loginUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie'; // Импортируем функцию для удаления куки
import { TUser } from '@utils-types';

export interface IUserState {
  user: TUser | null;
  isAuthorized: boolean;
  loading: boolean;
  error?: string | null;
}

const initialState: IUserState = {
  user: null,
  isAuthorized: false,
  loading: false,
  error: ''
};

export const getUser = createAsyncThunk<TUserResponse>(
  'user/getUser',
  async () => getUserApi()
);
export const registerUser = createAsyncThunk<TUserResponse, TRegisterData>(
  'user/register',
  async (data) => registerUserApi(data)
);
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);
export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/updateUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(data);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка обновления пользователя');
    }
  }
);
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка выхода из системы');
    }
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthorized = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthorized = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthorized = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default userSlice.reducer;
