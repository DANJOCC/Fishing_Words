import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth'
import profileReducer from '../features/user'
import roomConfigReducer from '../features/roomConfig'
const store= configureStore({
    reducer:{
        auth:authReducer,
        profile:profileReducer,
        roomConfig: roomConfigReducer
    }
})

export default store