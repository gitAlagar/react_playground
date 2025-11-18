import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from './store';

export const incrementAsync = createAsyncThunk<number>(
    "counter/incrementAsync",
    async () => {
        return new Promise<number>((resolve) =>
            setTimeout(() => resolve(1), 1000)
        )
    }
);

export const decrementAsync = createAsyncThunk<number>(
    "counter/decrementAsync",
    async () => {
        return new Promise<number>((resolve) =>
            setTimeout(() => resolve(1), 1000)
        )
    }
)


// interface CounterState {
//     value: number;
// }
export const selectCount = (state: RootState) => state.counter.value;

const counterSlice = createSlice({
    name: "counter",
    initialState: { value: 0 },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        reset: (state) => {
            state.value = 0
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.value += action.payload;
            })
            .addCase(decrementAsync.fulfilled, (state, action) => {
                state.value -= action.payload;
            });
    },
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
