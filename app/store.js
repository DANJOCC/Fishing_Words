import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth'
import profileReducer from '../features/user'

const store= configureStore({
    reducer:{
        auth:authReducer,
        profile:profileReducer
    }
})

export default store