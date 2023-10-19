import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios';
import { getCookie } from '../../utils/getCookie';

interface ILogin {
    user_name: string;
    user_password: string;
}

interface IUser {
    user_id: string;
    user_name: string;
    access_token: string;
}

interface IUserState {
    message: string | undefined;
    isLoggedIn: boolean;
    isLoading: boolean;
}

export const fetchLogin = createAsyncThunk(
    'user/login',
    async (data: ILogin, { rejectWithValue }) => {
        await axios
            .post<IUser>('http://localhost:5001/auth/login', data)
            .then((response) => {
                if (response.data.access_token) {
                    const date = new Date(Date.now() + 3600);
                    document.cookie =
                        encodeURIComponent('user') +
                        '=' +
                        encodeURIComponent(JSON.stringify(response.data)) +
                        '; expires=' +
                        date;
                }

                return response.data;
            })
            .catch((error) => rejectWithValue(error.response.data.message));
    }
);

export const fetchRegister = createAsyncThunk(
    'user/register',
    async (data: ILogin, { rejectWithValue }) => {
        await axios
            .post<IUser>('http://localhost:5001/auth/registration', data)
            .then((response) => {
                if (response.data.access_token) {
                    const date = new Date(Date.now() + 3600);
                    document.cookie =
                        encodeURIComponent('user') +
                        '=' +
                        encodeURIComponent(JSON.stringify(response.data)) +
                        '; expires=' +
                        date;
                }

                return response.data;
            })
            .catch((error) => rejectWithValue(error.response.data.message));
    }
);

const user = JSON.parse(localStorage.getItem('user') as string);

const initialState: IUserState = user
    ? {
          message: '',
          isLoggedIn: true,
          isLoading: false,
      }
    : {
          message: '',
          isLoggedIn: false,
          isLoading: false,
      };

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        sign_out: (state) => {
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchLogin.fulfilled, (state) => {
            if (getCookie('user')) state.isLoggedIn = true;
            state.isLoading = false;
        });
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.message =
                typeof action.payload === 'string' ? action.payload : '';
            state.isLoading = false;
            state.isLoggedIn = false;
        });

        builder.addCase(fetchRegister.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchRegister.fulfilled, (state) => {
            if (getCookie('user')) state.isLoggedIn = true;
            state.isLoading = false;
        });
        builder.addCase(fetchRegister.rejected, (state, action) => {
            state.message =
                typeof action.payload === 'string' ? action.payload : '';
            state.isLoading = false;
            state.isLoggedIn = false;
        });
    },
});

export const { sign_out } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
