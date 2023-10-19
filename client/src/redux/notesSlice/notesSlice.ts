import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import INote from '../../models/Note';
import axios from 'axios';
import authHeader from '../../utils/authHeader';

interface INotesState {
    notes: INote[];
    isLoading: boolean;
    message: string | undefined;
}

const initialState: INotesState = {
    notes: [],
    isLoading: false,
    message: '',
};

export const fetchNotes = createAsyncThunk(
    'notes/fetchNotes',
    async (search: string, { rejectWithValue }) => {
        return await axios
            .get<INote[]>(
                `http://localhost:5001/notes${
                    search !== '' ? '?search=' + search : ''
                }`,
                {
                    headers: authHeader(),
                }
            )
            .then((response) => {
                return response.data;
            })
            .catch((error) => rejectWithValue(error.response.data.message));
    }
);

export const notesSlice = createSlice({
    name: 'notes',
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
            state.message =
                typeof action.payload === 'string' ? action.payload : '';
            state.isLoading = false;
        });
    },
});

export default notesSlice.reducer;
