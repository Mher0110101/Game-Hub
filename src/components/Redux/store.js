import {configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import {rootReducer} from "./index2";
import {persistReducer, persistStore} from 'redux-persist'

const configs = {
    key: 'root',
    storage,
    whitelist: ['userReducer'],
}

const persistedReducer = persistReducer(configs, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistedStore = persistStore(store)
