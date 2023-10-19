import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IContent } from '../../models/NoteContent';
import { IContentTypes } from '../../models/NoteTypesOfContents';
import axios from 'axios';
import authHeader from '../../utils/authHeader';
import { status } from '../../models/Status';

interface INoteContentState {
    isLoading: boolean;
    message: string | undefined;
    note_name: string;
    note: IContent[];
}

const initialState: INoteContentState = {
    isLoading: false,
    message: '',
    note_name: '',
    note: [],
};

export const fetchNewNoteContent = createAsyncThunk(
    'note-content/fetchNewNote',
    async (
        data: { content: IContent[]; note_id: string },
        { rejectWithValue }
    ) => {
        await axios.delete(
            `http://localhost:5001/note-contents/${data.note_id}`
        );
        for (let i = 0; i < data.content.length; i++) {
            let sendData: IContent | FormData = data.content[i];
            if (
                data.content[i].type === 'image' ||
                data.content[i].type === 'canvas'
            ) {
                sendData = new FormData();
                sendData.append('type', data.content[i].type);
                sendData.append('content', data.content[i].content as File);
            }
            await axios
                .post<IContent>(
                    `http://localhost:5001/note-contents/${data.note_id}`,
                    sendData,
                    {
                        headers: authHeader(),
                    }
                )
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    rejectWithValue(error.response.data.message);
                });
        }
    }
);

export const fetchNoteContent = createAsyncThunk(
    'note-content/fetchNoteContent',
    async (note_id: string, { rejectWithValue }) => {
        return await axios
            .get<IContent[]>(`http://localhost:5001/note-contents/${note_id}`, {
                headers: authHeader(),
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                rejectWithValue(error.response.data.message);
            });
    }
);

export const noteContentSlice = createSlice({
    name: 'note-content',
    initialState,
    reducers: {
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
        builder.addCase(fetchNewNoteContent.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchNewNoteContent.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(fetchNewNoteContent.rejected, (state, action) => {
            state.message =
                typeof action.payload === 'string' ? action.payload : '';
            state.isLoading = false;
        });

        builder.addCase(fetchNoteContent.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchNoteContent.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload) {
                state.note = action.payload;
            }
        });
        builder.addCase(fetchNoteContent.rejected, (state, action) => {
            state.message =
                typeof action.payload === 'string' ? action.payload : '';
            state.isLoading = false;
        });
    },
});

export const { deleteNote, pushItem, updateItem, deleteItem } =
    noteContentSlice.actions;

export const selectNoteAct = (state: RootState) => state.noteContent;

export default noteContentSlice.reducer;
