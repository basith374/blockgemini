import { configureStore } from "@reduxjs/toolkit";
import posts from '../features/Posts/postsSlice';

export const store = configureStore({
  reducer: {
    posts
  }
});