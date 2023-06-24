import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: JSON.parse(sessionStorage.getItem('user')) || null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions
export default userSlice.reducer;