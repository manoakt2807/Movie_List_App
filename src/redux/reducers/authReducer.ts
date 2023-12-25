// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    username: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    username: null,
};



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = true;
            state.username = action.payload;
        },
        logout: (state) => {
            localStorage.clear()
            state.isAuthenticated = false;
            state.username = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export const getLoginDetail = (state: { auth: AuthState }) => state.auth
export default authSlice.reducer;
