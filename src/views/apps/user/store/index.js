// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from "axios";
import { users } from "../../../../users";
const baseUrl=import.meta.env.VITE_REACT_APP_BASE_URL;
export const getAllData = createAsyncThunk("appUsers/getAllData", async () => {
 //console.log(baseUrl);
  const response = await axios.get(`${baseUrl}/users`);
  //console.log(response.data);
  return response.data;
});

export const appUsersSlice = createSlice({
  name: "appUsers",
  initialState: {
    users: []
  },

  reducers: {
    getUsers: (state) => {
      state.users = users;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllData.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const {
  getUsers
} = appUsersSlice.actions
export default appUsersSlice.reducer;
