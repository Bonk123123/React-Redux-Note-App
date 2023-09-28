import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios';

interface ILogin {
    user_name: string;
    user_password: string;
}

interface IUser {
    user_id: string;
    user_name: string;
    accessToken: string;
}

interface IUserState {
    message: string | undefined;
    isLoggedIn: boolean;
    isLoading: boolean;
}

export const fetchLogin = createAsyncThunk(
    'user/login',
    async (data: ILogin, { rejectWithValue }) => {
        try {
            await axios
                .post<IUser>('http://localhost:8080/auth/signin', data)
                .then((response) => {
                    if (response.data.accessToken) {
                        // localStorage.setItem(
                        //     'user',
                        //     JSON.stringify(response.data)
                        // );
                        document.cookie =
                            encodeURIComponent('user') +
                            '=' +
                            encodeURIComponent(JSON.stringify(response.data));
                    }

                    return response.data;
                });
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const fetchRegister = createAsyncThunk(
    'user/register',
    async (data: ILogin, { rejectWithValue }) => {
        try {
            await axios
                .post<IUser>('http://localhost:8080/auth/signup', data)
                .then((response) => {
                    if (response.data.accessToken) {
                        // localStorage.setItem(
                        //     'user',
                        //     JSON.stringify(response.data)
                        // );
                        document.cookie =
                            encodeURIComponent('user') +
                            '=' +
                            encodeURIComponent(JSON.stringify(response.data));
                    }

                    return response.data;
                });
        } catch (e) {
            return rejectWithValue(e);
        }
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
            state.isLoggedIn = true;
            state.isLoading = false;
        });
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.message = action.error.message;
            state.isLoading = false;
        });

        builder.addCase(fetchRegister.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchRegister.fulfilled, (state) => {
            state.isLoggedIn = true;
            state.isLoading = false;
        });
        builder.addCase(fetchRegister.rejected, (state, action) => {
            state.message = action.error.message;
            state.isLoading = false;
        });
    },
});

export const { sign_out } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
