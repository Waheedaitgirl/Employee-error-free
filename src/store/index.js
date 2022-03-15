import { createStore, combineReducers,applyMiddleware} from 'redux';
import LoginReducer from './reducers/LoginReducer';
import thunk from 'redux-thunk';
    const rootReducer = combineReducers({
        LoginReducer,
    });
export const store =  createStore(rootReducer,applyMiddleware(thunk));