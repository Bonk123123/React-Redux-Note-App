import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IContent } from '../../models/NoteContent';
import { IContentTypes } from '../../models/NoteTypesOfContents';
import axios from 'axios';
import authHeader from '../../utils/authHeader';

interface INoteActState {
    isLoading: boolean;
    message: string | undefined;
    note_name: string;
    note: IContent[];
}

const initialState: INoteActState = {
    isLoading: false,
    message: '',
    note_name: '',
    note: [],
};

interface IFetchTypeCreateAndGet {
    note: IContent[];
    note_name: string;
}

interface IFetchTypeUpdate {
    note: IContent[];
    note_id: string;
    note_name: string;
}

export const fetchUpdateNote = createAsyncThunk(
    'noteAct/fetchUpdateNote',
    async (data: IFetchTypeUpdate, { rejectWithValue }) => {
        try {
            return await axios
                .post<IFetchTypeUpdate>(
                    `http://localhost:8080/note/${data}`,
                    data,
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

export const fetchOneNote = createAsyncThunk(
    'noteAct/fetchOneNote',
    async (id: string, { rejectWithValue }) => {
        try {
            return await axios
                .get<IFetchTypeCreateAndGet>(
                    `http://localhost:8080/note/${id}`,
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

export const fetchNewNote = createAsyncThunk(
    'noteAct/fetchNewNote',
    async (data: IFetchTypeCreateAndGet, { rejectWithValue }) => {
        try {
            return await axios
                .post<IFetchTypeCreateAndGet>('http://localhost:8080/', data, {
                    headers: authHeader(),
                })
                .then((response) => {
                    return response.data;
                });
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

export const noteActSlice = createSlice({
    name: 'noteAct',
    initialState,
    reducers: {
        setNoteName: (state, action: PayloadAction<string>) => {
            state.note_name = action.payload;
        },
        deleteNote: (state) => {
            state.note = [];
        },
        pushItem: (state, action: PayloadAction<IContentTypes>) => {
            state.note = [
                ...state.note,
                { type: action.payload, content: [['']] },
            ];
        },
        updateItem: (
            state,
            action: PayloadAction<{ j: number; content: IContent }>
        ) => {
            state.note = state.note.map((item, i) => {
                if (i === action.payload.j) {
                    return action.payload.content;
                } else {
                    return item;
                }
            });
        },
        deleteItem: (state, action: PayloadAction<number>) => {
            state.note = state.note.filter((_, i) => i !== action.payload);
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchNewNote.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchNewNote.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload) {
                state.note_name = action.payload.note_name;
                state.note = action.payload.note;
            }
        });
        builder.addCase(fetchNewNote.rejected, (state, action) => {
            state.message = action.error.message;
            state.isLoading = false;
        });

        builder.addCase(fetchUpdateNote.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUpdateNote.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload) {
                state.note_name = action.payload.note_name;
                state.note = action.payload.note;
            }
        });
        builder.addCase(fetchUpdateNote.rejected, (state, action) => {
            state.message = action.error.message;
            state.isLoading = false;
        });

        builder.addCase(fetchOneNote.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchOneNote.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload) {
                state.note_name = action.payload.note_name;
                state.note = action.payload.note;
            }
        });
        builder.addCase(fetchOneNote.rejected, (state, action) => {
            state.message = action.error.message;
            state.isLoading = false;
        });
    },
});

export const { setNoteName, deleteNote, pushItem, updateItem, deleteItem } =
    noteActSlice.actions;

export const selectNoteAct = (state: RootState) => state.noteAct;

export default noteActSlice.reducer;
