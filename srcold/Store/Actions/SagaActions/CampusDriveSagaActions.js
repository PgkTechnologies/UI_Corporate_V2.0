import {
    ACTION_GET_CAMPUS_DRIVE_INVITES_REQUEST,
    ACTION_POST_RESPOND_TO_CAMPUS_DRIVE_REQUEST_REQUEST,
    ACTION_GET_CAMPUS_DRIVE_ACCEPTED_INVITES_LIST_REQUEST,
    ACTION_POST_CAMPUS_DRIVE_CLOSE_REQUEST,
    ACTION_GET_CAMPUS_DRIVE_STUDENT_RESUME_REQUEST,
    ACTION_GET_STUDENT_GAPS_INFO_REQUEST,
    ACTION_GET_STUDENT_PROFILE_AND_HIRING_REQUEST    
} from "./SagaActionTypes"

export const actionGetCampusDriveInvites = (payload) => {
    return {
        type: ACTION_GET_CAMPUS_DRIVE_INVITES_REQUEST,
        payload: payload
    }
};

export const actionPostRespondToCampusDriveRequest = (payload) => {
    return {
        type: ACTION_POST_RESPOND_TO_CAMPUS_DRIVE_REQUEST_REQUEST,
        payload: payload
    }
};

export const actionGetCampusDriveAcceptedInvitesListRequest = (payload) => {
    return {
        type: ACTION_GET_CAMPUS_DRIVE_ACCEPTED_INVITES_LIST_REQUEST,
        payload: payload
    }
};

export const GetStudentProfileAndHiringInfoSagaAction = (payload) => {
    return {
        type: ACTION_GET_STUDENT_PROFILE_AND_HIRING_REQUEST,
        payload: payload
    }
};

export const GetStudentGapsSagaAction = (payload) => {
    return {
        type: ACTION_GET_STUDENT_GAPS_INFO_REQUEST,
        payload: payload
    }
};

export const actionPostCampusDriveCloseRequest = (payload) => {
    return {
        type: ACTION_POST_CAMPUS_DRIVE_CLOSE_REQUEST,
        payload: payload,
    }
}

export const actionGetCampusDriveStudentResumeRequest = (payload) => {
    return {
        type: ACTION_GET_CAMPUS_DRIVE_STUDENT_RESUME_REQUEST,
        payload: payload,
    }
}