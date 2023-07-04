import {
    ACTION_GET_CAMPUS_DRIVE_EMAIL_TEMPLATES_LIST_REQUEST,
    ACTION_POST_CAMPUS_DRIVE_NEW_EMAIL_TEMPLATE_REQUEST,
    ACTION_GET_CAMPUS_DRIVE_INDUCTION_INFO_REQUEST,
    ACTION_POST_CAMPUS_DRIVE_INDUCTION_INFO_REQUEST,
    ACTION_PATCH_CAMPUS_DRIVE_INDUCTION_INFO_REQUEST,
    ACTION_DELETE_CAMPUS_DRIVE_INDUCTION_INFO_REQUEST,
    ACTION_GET_CAMPUS_DRIVE_EMAIL_TEMPLATE_DETAILS_REQUEST,
    ACTION_POST_CAMPUS_DRIVE_INTERVIEW_ROUNDS_REQUEST,
    ACTION_PATCH_CAMPUS_DRIVE_INTERVIEW_ROUNDS_REQUEST,
    ACTION_SHARE_CAMPUS_DRIVE_INTERVIEW_ROUNDS_REQUEST,
    ACTION_PATCH_CAMPUS_DRIVE_EMAIL_TEMPLATE_INFO_REQUEST,
    ACTION_DELETE_CAMPUS_DRIVE_EMAIL_TEMPLATE_INFO_REQUEST
} from "../SagaActionTypes"

// GET EMAIL TEMPLATES LIST - CAMPUS DRIVE
export const actionGetCampusDriveEmailTemplatesListRequestSaga = (payload) => {
    return {
        type: ACTION_GET_CAMPUS_DRIVE_EMAIL_TEMPLATES_LIST_REQUEST,
        payload: payload
    }
}

// CREATE NEW EMAIL TEMPLATE LIST - CAMPUS DRIVE
export const actionPostNewEmailTemplateRequestSaga = (payload) => {
    return {
        type: ACTION_POST_CAMPUS_DRIVE_NEW_EMAIL_TEMPLATE_REQUEST,
        payload: payload
    }
}

// GET EMAIL TEMPLATE INFO- CAMPUS DRIVE
export const actionGetEmailTemplateInfoRequestSaga = (payload) => {
    return {
        type: ACTION_GET_CAMPUS_DRIVE_EMAIL_TEMPLATE_DETAILS_REQUEST,
        payload: payload
    }
}

// PATCH EMAIL TEMPLATE INFO - CAMPUS DRIVE
export const actionPatchEmailTemplateInfoRequestSaga = (payload) => {
    return {
        type: ACTION_PATCH_CAMPUS_DRIVE_EMAIL_TEMPLATE_INFO_REQUEST,
        payload: payload
    }
}

// DELETE INDUCTION INFO - CAMPUS DRIVE
export const actionDeleteIndcutionInfoRequestSaga = (payload) => {
    return {
        type: ACTION_DELETE_CAMPUS_DRIVE_INDUCTION_INFO_REQUEST,
        payload: payload
    }
}

// DELETE EMAIL TEMPLATE INFO - CAMPUS DRIVE
export const actionDeleteEmailTemplateInfoRequestSaga = (payload) => {
    return {
        type: ACTION_DELETE_CAMPUS_DRIVE_EMAIL_TEMPLATE_INFO_REQUEST,
        payload: payload
    }
}

// GET EXISTING INDUCTION INFO - CAMPUS DRIVE
export const actionGetInductionInfoRequestSaga = (payload) => {
    return {
        type: ACTION_GET_CAMPUS_DRIVE_INDUCTION_INFO_REQUEST,
        payload: payload
    }
}

// POST NEW INDUCTION INFO - CAMPUS DRIVE
export const actionPostInductionInfoRequestSaga = (payload) => {
    return {
        type: ACTION_POST_CAMPUS_DRIVE_INDUCTION_INFO_REQUEST,
        payload: payload
    }
}

// PATCH NEW INDUCTION INFO - CAMPUS DRIVE
export const actionPatchInductionInfoRequestSaga = (payload) => {
    return {
        type: ACTION_PATCH_CAMPUS_DRIVE_INDUCTION_INFO_REQUEST,
        payload: payload
    }
}

// POST INTERVIEW ROUNDS FOR A JOB - CAMPUS DRIVE
export const actionPostInterviewRoundsSaga = (payload) => {
    return {
        type: ACTION_POST_CAMPUS_DRIVE_INTERVIEW_ROUNDS_REQUEST,
        payload: payload
    }
}

// PATCH INTERVIEW ROUNDS FOR A JOB - CAMPUS DRIVE
export const actionPatchInterviewRoundsSaga = (payload) => {
    return {
        type: ACTION_PATCH_CAMPUS_DRIVE_INTERVIEW_ROUNDS_REQUEST,
        payload: payload
    }
}

// SHARE INTERVIEW ROUNDS FOR A JOB - CAMPUS DRIVE
export const actionShareInterviewRoundsSaga = (payload) => {
    return {
        type: ACTION_SHARE_CAMPUS_DRIVE_INTERVIEW_ROUNDS_REQUEST,
        payload: payload
    }
}