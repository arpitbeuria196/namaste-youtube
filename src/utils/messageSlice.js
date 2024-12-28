import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: [],
    },
    reducers:
    {
        liveMessages: (state,action)=>
        {
            if(state.messages.length >= 10)
            {
                state.messages.shift();
            }
            state.messages.push(action.payload);
        }
    }
})

export const{liveMessages} = messageSlice.actions;

export default messageSlice.reducer;