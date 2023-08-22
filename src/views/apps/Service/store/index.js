// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


// ** Axios Imports
import axios from "axios"
import { users} from "../../../../users"
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL
export const getAllData = createAsyncThunk("appServices/getAllData", async () => {
 //console.log(baseUrl);
  const response = await axios.get(`${baseUrl}/deals`)
  //console.log(response.data.deals);
  return response.data.deals
})

// export const getCategoriesOptions = createAsyncThunk("appServices/CategoriesOptions", async () => {
//   //console.log(baseUrl);
//    const response = await axios.get(`${baseUrl}/category`)
//    //console.log(response.data.deals);
//    return response.data.category
//  })

export const appServicesSlice = createSlice({
  name: "appServices",
  initialState: {
    deals: [],
    categoryOptions:[]
  },

  reducers: {
    getDeals: (state) => {
      state.deals = deals
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getAllData.fulfilled, (state, action) => {
      state.deals = action.payload
    })
    // builder.addCase(getCategoriesOptions.fulfilled, (state, action) => {
    //   state.categoryOptions = action.payload
    // })
  }
})

export const {
  getDeals,
} = appServicesSlice.actions
export default appServicesSlice.reducer
