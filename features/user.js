import {createSlice} from '@reduxjs/toolkit'
const initialState={
    username:'',
    tlf:'',
    password:''
}

export const profile= createSlice({
    name:'profile',
    initialState,
    reducers:{
        getProfile:(state, action)=>{
           state.username=action.payload.username
           state.tlf=action.payload.tlf
            state.password=action.payload.password
        }
    }
})

export const {getProfile}=profile.actions

export default profile.reducer