import { createSlice } from "@reduxjs/toolkit";

const initialState={
    time:300000,
    length:5,
    rounds:3,
    tries:6,
}

export const roomConfig=createSlice({
    name:'roomConfig',
    initialState,
    reducers:{
        getConfig:(state,action)=>{
            state.time=action.payload.time
            state.length=action.payload.length
            state.rounds=action.payload.rounds
            state.tries=action.payload.tries
        }
    }
})

export const {getConfig}=roomConfig.actions

export default roomConfig.reducer