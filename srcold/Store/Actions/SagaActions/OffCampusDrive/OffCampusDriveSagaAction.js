import {
    ACTION_POST_ADD_NEW_OFF_CAMPUS_REQUEST,
    ACTION_POST_ADD_ALL_PUBLISHED_JOBS_REQUEST,
    ACTION_GET_OFF_CAMPUS_PUBLISHED_JOBS_REQUEST,
    ACTION_GET_ALL_OFF_CAMPUS_DRIVES_REQUEST,
    ACTION_GET_OFF_CAMPUS_DRIVE_JOBS_REQUEST
}
    from "../SagaActionTypes";

export const actionPostAddNewOffCampusRequest = (payload) => {
    return {
        type: ACTION_POST_ADD_NEW_OFF_CAMPUS_REQUEST,
        payload: payload,
    }
}

export const actionPostAddAllPublishedJobsRequest = (payload) => {
    return {
        type: ACTION_POST_ADD_ALL_PUBLISHED_JOBS_REQUEST,
        payload: payload,
    }
}

export const actionGetAllOffCampusDrivesRequest = (payload) => {
    return {
        type: ACTION_GET_ALL_OFF_CAMPUS_DRIVES_REQUEST,
        payload: payload,
    }
}

export const actionGetAllPublishedJobsRequest = (payload) => {
    return {
        type: ACTION_GET_OFF_CAMPUS_PUBLISHED_JOBS_REQUEST,
        payload: payload
    }
}

export const actionGetOffCampusDriveJobsRequest = (payload) => {
    return {
        type: ACTION_GET_OFF_CAMPUS_DRIVE_JOBS_REQUEST,
        payload: payload
    }
}