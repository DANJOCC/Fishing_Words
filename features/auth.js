import {createSlice} from '@reduxjs/toolkit'
const initialState={
    token:'',
    user:''
}

export const auth= createSlice({
    name:'auth',
    initialState,
    reducers:{
        getAuth:(state, action)=>{
           state.token=action.payload.token
           state.user=action.payload.username
        }
    }
})

export const {getAuth}=auth.actions

export default auth.reducer