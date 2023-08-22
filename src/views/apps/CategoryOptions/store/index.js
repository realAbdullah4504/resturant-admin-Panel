// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const baseUrl=import.meta.env.VITE_REACT_APP_BASE_URL;

export const getCategoriesOptions = createAsyncThunk(
  "appCategories/getCategoriesOptions",
  async () => {
    //console.log(baseUrl);
    const response = await axios.get(`${baseUrl}/category`);
    // console.log('abc',response.data);
    return response.data.category;
  }
);

export const appCategoriesSlice = createSlice({
  name: "appCategories",
  initialState: {
    categoryOptions: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoriesOptions.fulfilled, (state, action) => {
      state.categoryOptions = action.payload;
    });
  },
});

// export const { getDeals } = appServicesSlice.actions;
export default appCategoriesSlice.reducer;
