
import { } from './constants/actionTypes';

const promiseMiddleware = store => next => action => {
    // Do Nothing for now.//
    next(action);
};

function isPromise(v) {
    return v && typeof v.then === 'function';
}

export { promiseMiddleware }