import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import INote from '../../models/Note';
import axios from 'axios';
import authHeader from '../../utils/authHeader';

interface INoteState {
    note: INote;
    isLoading: boolean;
    message: string | undefined;
}

const initialState: INoteState = {
    note: {
        note_name: '',
        id: '',
        last_change: new Date(),
        note_status: 'in progress',
    },
    isLoading: false,
    message: '',
};

export const fetchNewNote = createAsyncThunk(
    'note/fetchNewNote',
    async (
        data: { note_name: string; user_id: string },
        { rejectWithValue }
    ) => {
        return await axios
            .post('http://localhost:5001/notes', data, {
                headers: authHeader(),
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => rejectWithValue(error.response.data.message));
    }
);

export const fetchChangeNoteName = createAsyncThunk(
    'note/fetchChangeNoteName',
    async (
        data: { note_name: string; note_id: string },
        { rejectWithValue }
    ) => {
        await axios
            .patch(
                `http://localhost:5001/notes/${data.note_id}`,
                { note_name: data.note_name },
                {
                    headers: authHeader(),
                }
            )
            .catch((error) => rejectWithValue(error.response.data.message));
    }
);

export const fetchNote = createAsyncThunk(
    'note/fetchNote',
    async (id: string, { rejectWithValue }) => {
        return await axios
            .get(`http://localhost:5001/notes/${id}`, {
                headers: authHeader(),
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => rejectWithValue(error.response.data.message));
    }
);

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        setNoteName: (state, action: PayloadAction<string>) => {
            state.note = { ...state.note, note_name: action.payload };
        },
        setId: (state, action: PayloadAction<string>) => {
            state.note = { ...state.note, id: action.payload };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNewNote.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchNewNote.fulfilled, (state, action) => {
            if (action.payload) state.note = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchNewNote.rejected, (state, action) => {
            state.message =
                typeof action.payload === 'string' ? action.payload : '';
            state.isLoading = false;
        });

        builder.addCase(fetchChangeNoteName.rejected, (state, action) => {
            state.message =
                typeof action.payload === 'string' ? action.payload : '';
        });

        builder.addCase(fetchNote.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchNote.fulfilled, (state, action) => {
            if (action.payload) state.note = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchNote.rejected, (state, action) => {
            state.message =
                typeof action.payload === 'string' ? action.payload : '';
            state.isLoading = false;
        });
    },
});

export const { setNoteName, setId } = noteSlice.actions;

export default noteSlice.reducer;
