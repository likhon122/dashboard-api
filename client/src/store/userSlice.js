// slices/userSlice.js
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ServerApi from "../api/serverApi";

// Asynchronous thunk action (if needed)
export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(ServerApi.verifyUser.url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const userData = response.data.user;
      if (userData.data === null) {
        return {};
      }
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { setUserDetails, logout } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
