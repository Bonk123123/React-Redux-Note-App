import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface ICanvasState {
    // generation: number;
    color: string;
    pause: boolean;
}

const initialState: ICanvasState = {
    // generation: 0,
    color: 'rgb(0, 100, 200)',
    pause: false,
};

export const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        pauseOrResumeGame: (state) => {
            state.pause = !state.pause;
        },
        setColor: (state, action: PayloadAction<string>) => {
            state.color = action.payload;
        },
        // addGeneration: (state) => {
        //     state.generation++;
        // },
    },
});

export const { pauseOrResumeGame, setColor } = canvasSlice.actions;

export const selectCanvas = (state: RootState) => state.canvas;

export default canvasSlice.reducer;
