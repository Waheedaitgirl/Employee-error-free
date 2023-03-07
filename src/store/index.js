import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {persistReducer, persistStore} from 'redux-persist';
import LoginReducer from './reducers/LoginReducer';
import StatusReducer from './reducers/StatusReducer';
import {taskApi} from './services/taskApi';
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
    StatusReducer: StatusReducer,
    LoginReducer: persistReducer(persistConfig, LoginReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      serializableCheck: false,
    }).concat(taskApi.middleware),
});
setupListeners(store.dispatch);
export const persistor = persistStore(store);
