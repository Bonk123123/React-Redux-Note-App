import { configureStore } from '@reduxjs/toolkit';
import canvasSlice from './canvasSlice/canvasSlice';
import noteSlice from './noteSlice/noteSlice';
import userSlice from './userSlice/userSlice';
import noteContentSlice from './noteContentSlice/noteContentSlice';
import notesSlice from './notesSlice/notesSlice';
// ...

export const store = configureStore({
    reducer: {
        canvas: canvasSlice,
        note: noteSlice,
        notes: notesSlice,
        user: userSlice,
        noteContent: noteContentSlice,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
