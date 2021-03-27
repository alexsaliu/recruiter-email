import {
    UPDATE_JOBS,
    UPDATE_TAGS,
    UPDATE_CANDIDATES
} from './constants.js'

export const updateJobs = (jobs) => {
    return {
        type: UPDATE_JOBS,
        payload: jobs,
    }
}
export const updateTags = (tags) => {
    return {
        type: UPDATE_TAGS,
        payload: tags,
    }
}
export const updateCandidates = (candidates) => {
    return {
        type: UPDATE_CANDIDATES,
        payload: candidates,
    }
}
