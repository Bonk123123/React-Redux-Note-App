import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import INote from '../../models/Note';
import axios from 'axios';
import authHeader from '../../utils/authHeader';

interface INoteState {
    notes: INote[];
    isLoading: boolean;
    message: string | undefined;
}

const initialState: INoteState = {
    notes: [],
    isLoading: false,
    message: '',
};

export const fetchNotes = createAsyncThunk(
    'note/fetchNotes',
    async (search: string, { rejectWithValue }) => {
        try {
            return await axios
                .get<INote[]>(
                    `http://localhost:8080/note${
                        search !== '' ? '?search=' + search : ''
                    }`,
                    {
                        headers: authHeader(),
                    }
                )
                .then((response) => {
                    return response.data;
                });
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchNotes.fulfilled, (state, action) => {
            if (action.payload) state.notes = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchNotes.rejected, (state, action) => {
            state.message = action.error.message;
            state.isLoading = false;
        });
    },
});

export const selectCanvas = (state: RootState) => state.note;

export default noteSlice.reducer;
