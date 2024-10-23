import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../constants";
import axios from "axios";

export const getAllPosts = createAsyncThunk(
  "getAllPosts",
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    if (state.posts.posts.length === 0) {
      try {
        const response = await axios.get(`${BASE_URL}/api/posts`);
        const result = await response.data;
        return result;
      } catch (error) {
        return rejectWithValue(error);
      }
    } else {
      return state.posts.posts;
    }
  }
);

export const createPost = createAsyncThunk(
  "createPost",
  async (postDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/posts`,
        postDetails,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const result = await response.data;
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePost = createAsyncThunk(
  "editPost",
  async ({ postId, postData }, { rejectWithValue }) => {
    const { title, description, image } = postData;
    const postDetails = image
      ? { title, description, image }
      : { title, description };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/posts/${postId}`,
        postDetails,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const result = await response.data;
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/api/posts/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPosts = [...state.posts, action.payload];
        state.posts = updatedPosts;
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPosts = state.posts.filter(
          (post) => post._id !== action.payload
        );
        state.posts = updatedPosts;
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPosts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          } else return post;
        });
        state.posts = updatedPosts;
        state.error = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
