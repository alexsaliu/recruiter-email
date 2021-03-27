import { combineReducers } from 'redux';

import { reducer } from './reducers.js';

export const rootReducer = combineReducers({
    app: reducer
})
