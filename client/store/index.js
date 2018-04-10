import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import campuses from './campuses';
import students from './students';

const reducer = combineReducers({ campuses, students });

const middleware = applyMiddleware(thunkMiddleware, loggerMiddleware);

const store = createStore(reducer, middleware);

export default store;

export * from './campuses';
export * from './students';
