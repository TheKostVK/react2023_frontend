import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";

export const fetchUAuth = createAsyncThunk('auth/fetchUserData', async (params) => {
    const {data} = await axios.post('/auth/login', params);
    return data;
});

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
              state.data = null;
              state.status = 'loaded';
        },
    },
    extraReducers: {
        [fetchUAuth.pending]: (state) => {
            state.data = null;
            state.status = 'loading';
        },
        [fetchUAuth.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        },
        [fetchUAuth.rejected]: (state) => {
            state.data = null;
            state.status = 'error';
        },
    },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions;