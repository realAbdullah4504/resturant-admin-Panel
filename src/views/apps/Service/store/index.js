// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from "axios";
import { users } from "../../../../users";
const baseUrl=import.meta.env.VITE_REACT_APP_BASE_URL;
export const getAllData = createAsyncThunk("appServices/getAllData", async () => {
 //console.log(baseUrl);
  const response = await axios.get(`${baseUrl}/service`);
  //console.log(response.data.services);
  return response.data.services;
});


export const appServicesSlice = createSlice({
  name: "appServices",
  initialState: {
    services: [],
  },

  reducers: {
    getServices: (state) => {
      state.services = services;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllData.fulfilled, (state, action) => {
      state.services = action.payload;
    });
  },
});

export const {
  getUsers
} = appServicesSlice.actions
export default appServicesSlice.reducer;
