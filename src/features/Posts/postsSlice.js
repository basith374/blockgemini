import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "./postsApi";

const initialState = {
  posts: [],
  selectedPost: null
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await api.fetchPosts();
  return await response.json();
});

export const fetchDetails = createAsyncThunk("posts/fetchPostDetails", async (id) => {
  const response = await api.fetchPostDetails(id);
  return await response.json();
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    selectPost: (state, action) => {
      state.selectedPost = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      console.log(action);
      state.posts = action.payload;
    });
    builder.addCase(fetchDetails.fulfilled, (state, action) => {
      state.selectedPost = action.payload;
    })
  },
});

export const { selectPost } = postsSlice.actions;

export const selectPosts = (state) => state.posts.posts;
export const selectDetails = (state) => state.posts.selectedPost;

export default postsSlice.reducer;
