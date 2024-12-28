import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice"
import messageSlice from "./messageSlice"

const store = configureStore({
    reducer:{
        app: appSlice,
        search: searchSlice,
        message: messageSlice
    }
})

export default store;