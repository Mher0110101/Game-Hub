import {combineReducers} from "@reduxjs/toolkit";
import userReducer from './slices.js'

export const rootReducer = combineReducers({
    [userReducer]:null
});
