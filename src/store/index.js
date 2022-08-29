import LoginReducer from './reducers/LoginReducer';
import {taskApi} from './services/taskApi';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'token', 'is_logged_in'],
};

// const rootReducer = combineReducers({
//     StatusReducer:StatusReducer,
//     [taskApi.reducerPath]: taskApi.reducer,
//     LoginReducer:persistReducer(persistConfig, LoginReducer),
// });
export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,

    LoginReducer: persistReducer(persistConfig, LoginReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(taskApi.middleware),
});
// export const store =  createStore(rootReducer,applyMiddleware());
export const persistor = persistStore(store);
