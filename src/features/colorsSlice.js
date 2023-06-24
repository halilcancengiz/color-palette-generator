import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: []
};

export const colorsSlice = createSlice({
    name: 'colors',
    initialState,
    reducers: {
        setColors: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setColors } = colorsSlice.actions
export default colorsSlice.reducer;