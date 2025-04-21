import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {
        firstName: '',
        lastName: '',
        email: '',
        profile_image: '',
        fullname: '',
    },
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const { data } = action.payload;
            state.data = data;
            state.isAuthenticated = true;
        },
        logout: ( state ) => {
            state.data = {
                firstName: '',
                lastName: '',
                email: '',
                profile_image: '',
                fullname: '',
            };
            state.isAuthenticated = true;
        }
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;