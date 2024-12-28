import { createSlice } from "@reduxjs/toolkit";


const searchSlice = createSlice({

    name:"search",
    initialState :{},
    reducers:
    {
        cachesAtRedux: (state,action)=>
        {
           const {searchQuery,data} = action.payload;

           if(state[searchQuery])
           {
             delete state[searchQuery];
           }


           state[searchQuery] = data;

           const keys = Object.keys(state);

           if(keys.length> 10)
           {
             delete state[keys[0]]
           }
        }
    }
})

export const{cachesAtRedux} = searchSlice.actions;

export default searchSlice.reducer;