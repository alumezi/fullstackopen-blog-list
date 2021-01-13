import {createStore, applyMiddleware, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import {notification} from './reducers/notification';

export const store = createStore(combineReducers({notification}), composeWithDevTools(applyMiddleware(thunk)));
