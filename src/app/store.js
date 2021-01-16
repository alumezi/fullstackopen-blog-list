import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import { notification } from './reducers/notification';
import { blogs } from './reducers/blogs';

export const store = createStore(
    combineReducers(
        {
            notification,
            blogs
        }
    ),
    composeWithDevTools(applyMiddleware(thunk)));
