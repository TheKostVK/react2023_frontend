import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const {data} = await axios.post('/auth/login', params);
    return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return thunkAPI.rejectWithValue('Token not found');
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const { data } = await axios.get('/auth/me', config);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
});


export const fetchRegistration = createAsyncThunk('auth/fetchRegistration', async (params) => {
    const {data} = await axios.post('/auth/registration', params);
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
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchRegistration.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchRegistration.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchRegistration.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions;