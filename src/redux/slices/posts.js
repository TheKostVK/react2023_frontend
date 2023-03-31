import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";
import instance from "../../axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/posts');
    return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const {data} = await axios.get('/posts/tags');
    return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
    await axios.delete(`/posts/${id}`);
});


// Создаем thunk для получения статей одного пользователя по его id
export const fetchUserPosts = createAsyncThunk("posts/fetchUserPosts", async (userId) => {
      const { data } = await axios.get(`/posts/user/${userId}`);
      return data;
  }
);


// Запрос на получения новых постов с сервера на основе сравнения id последнего поста клиента и сервера
export const fetchNewPosts = createAsyncThunk(
  "posts/fetchNewPosts",
  async (lastPostId) => {
      const response = await instance.get(`/api/posts?lastPostId=${lastPostId}`);
      const newPosts = response.data;
      return newPosts.length ? newPosts : null;
  }
);


const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
    userPosts: {
        items: [],
        status: 'loading',
    }
};


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        // posts
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },

        // tags
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },

        // remove
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
        },
        [fetchRemovePost.rejected]: (state) => {
            state.posts.status = 'error';
        },

        // userPostById
        [fetchUserPosts.pending]: (state) => {
            state.userPosts.items = [];
            state.status = "loading";
        },
        [fetchUserPosts.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.userPosts.items = action.payload;
        },
        [fetchUserPosts.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    },
});


export const postsReducer = postsSlice.reducer;