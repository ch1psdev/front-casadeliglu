import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        status: 'logout',
},
    reducers: {
        login: ( state ) => {
            state.status="login"
        }
    }
});

export const { login } = authSlice.actions;
export default authSlice.reducer;