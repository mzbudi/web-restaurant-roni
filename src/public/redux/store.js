import {createStore, applyMiddleware} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'

import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import storage from 'redux-persist/lib/storage'

import reducers from './reducers'

const persistConfig ={
    key : 'root',
    storage,
    whitelist: ['auth'],
}

const persistedReducers = persistReducer(persistConfig,reducers)
const store = createStore(persistedReducers, applyMiddleware(logger,promiseMiddleware))
const persistor = persistStore(store)

export default {store, persistor}