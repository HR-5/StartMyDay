import {combineReducers, applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/reducer';
import newsReducer from './reducers/listreducer';
import detailReducer from './reducers/detailreducer';

const rootReducer = combineReducers({
  userReducer: userReducer,
  newsReducer: newsReducer,
  detailReducer: detailReducer,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
