import {
    UPDATE_JOBS,
    UPDATE_TAGS,
    UPDATE_CANDIDATES
} from './constants.js'

const initialState = JSON.parse(localStorage.getItem('state')) || {
    jobs: [],
    tags: [],
    candidates: []
}

const storeInLocalStorage = (state) => {
    localStorage.setItem('state', JSON.stringify(state))
    return state
}

const pipe = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args)

export const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_JOBS:
            return pipe(storeInLocalStorage)({...state, jobs: action.payload})
        case UPDATE_TAGS:
            return pipe(storeInLocalStorage)({...state, tags: action.payload})
        case UPDATE_CANDIDATES:
            return pipe(storeInLocalStorage)({...state, candidates: action.payload})
        default:
            return state
    }
}
