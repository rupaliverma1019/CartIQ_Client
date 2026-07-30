import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAddress:
    JSON.parse(localStorage.getItem("shippingAddress")) || {},
};

const shippingSlice = createSlice({
  name: "shipping",

  initialState,

  reducers: {

    saveShippingAddress: (state, action) => {

      state.shippingAddress = action.payload;

      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(action.payload)
      );

    },

  },
});

export const {
  saveShippingAddress,
} = shippingSlice.actions;

export default shippingSlice.reducer;