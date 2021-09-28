import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {dataReducer} from '../reducer';
import thunk from 'redux-thunk';

const defaultApplyMiddleware = applyMiddleware(thunk);
const enchancer = process.env.__DEVELOPMENT__ ? composeWithDevTools(defaultApplyMiddleware) : defaultApplyMiddleware;

export const appStore = createStore(dataReducer, enchancer);