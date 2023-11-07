import { configureStore } from "@reduxjs/toolkit";
import {reducer as idReducer} from './store/id.state'

const store = configureStore({
    reducer:{
        idReducer
    }
})

export default store