import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import shippingReducer from "./slices/shippingSlice";
const store = configureStore({
    reducer : {
        auth : authReducer,
        cart: cartReducer,
        shipping:shippingReducer
    },

})


export default store


//  configureStore() =  It creates the central database of your React application.