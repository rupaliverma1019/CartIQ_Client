import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
const store = configureStore({
    reducer : {
        auth : authReducer,
        cart: cartReducer,
    },

})


export default store


//  configureStore() =  It creates the central database of your React application.