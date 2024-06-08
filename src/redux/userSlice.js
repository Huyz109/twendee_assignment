import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../api/user.api";

export const loadStatus = {
  None: 0,
  Loading: 1,
  Success: 2,
  Failed: 3,
};

export const getUser = createAsyncThunk(
  "/user",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getUserData("", params);
      return response?.results;
    } 
    catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    loadDataStatus: loadStatus.None,
  },
  reducers: {
    resetLoadDataStatus: (state) => {
      state.data = [];
      state.loadDataStatus = loadStatus.None;
    },
  },
    extraReducers: (builder) => {
      builder
        .addCase(getUser.pending, (state, action) => {
          state.loadDataStatus = loadStatus.Loading;
        })
        .addCase(getUser.fulfilled, (state, action) => {
          state.data = action.payload;
          state.loadDataStatus = loadStatus.Success;
        })
        .addCase(getUser.rejected, (state, action) => {
          state.data = [];
          state.loadDataStatus = loadStatus.Failed;
        });
    },
});

const { reducer: userReducer } = userSlice;
export const { resetLoadDataStatus } = userSlice.actions;
export default userReducer;
