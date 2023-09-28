import { configureStore } from '@reduxjs/toolkit';
import canvasSlice from './canvasSlice/canvasSlice';
import noteSlice from './noteSlice/noteSlice';
import userSlice from './userSlice/userSlice';
import noteActSlice from './noteActSlice/noteActSlice';
// ...

export const store = configureStore({
    reducer: {
        canvas: canvasSlice,
        note: noteSlice,
        user: userSlice,
        noteAct: noteActSlice,
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
