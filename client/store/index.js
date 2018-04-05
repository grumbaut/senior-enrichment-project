import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import campuses from './campuses';
import students from './students';
import error from './error';

const reducer = combineReducers({ campuses, students, error });

const middleware = applyMiddleware(thunkMiddleware, loggerMiddleware);

const store = createStore(reducer, middleware);

export default store;

export * from './campuses';
export * from './students';
export * from './error';
