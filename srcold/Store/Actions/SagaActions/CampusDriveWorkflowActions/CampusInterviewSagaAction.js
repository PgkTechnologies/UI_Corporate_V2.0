import {
    ACTION_GET_CAMPUS_DRIVE_INTERVIEW_ROUNDS_REQUEST,
    ACTION_GET_CAMPUS_DRIVE_INTERVIEW_STUDENTS_LIST_REQUEST,
    ACTION_POST_CAMPUS_DRIVE_INTERVIEW_STUDENTS_LIST_REQUEST,
    ACTION_POST_CAMPUS_DRIVE_INTERVIEW_STUDENTS_LIST_SHARE_REQUEST,
    ACTION_GET_CAMPUS_DRIVE_FINAL_STUDENTS_LIST_REQUEST,
    ACTION_POST_CAMPUS_DRIVE_OFFER_LETTERS_REQUEST,
    ACTION_GET_CAMPUS_DRIVE_OFFER_LETTER_REQUEST,
} from "../SagaActionTypes";

// GET INTERVIEW ROUNDS - CAMPUS DRIVE
export const actionGetInterviewRoundsRequestSaga = (payload) => {
    return {
        type: ACTION_GET_CAMPUS_DRIVE_INTERVIEW_ROUNDS_REQUEST,
        payload: payload
    }
}

// GET STUDENTS LIST FOR SPECIFIC ROUND - CAMPUS DRIVE
export const actionGetStudentsListSaga = (payload) => {
    return {
        type: ACTION_GET_CAMPUS_DRIVE_INTERVIEW_STUDENTS_LIST_REQUEST,
        payload: payload
    }
}

// POST SELECTED STUDENTS LIST FOR SPECIFIC ROUND - CAMPUS DRIVE
export const actionPostStudentsListForRoundSaga = (payload) => {
    return {
        type: ACTION_POST_CAMPUS_DRIVE_INTERVIEW_STUDENTS_LIST_REQUEST,
        payload: payload
    }
}

// POST SELECTED STUDENTS LIST SHARE - CAMPUS DRIVE
export const actionPostStudentsListShareRequestSaga = (payload) => {
    return {
        type: ACTION_POST_CAMPUS_DRIVE_INTERVIEW_STUDENTS_LIST_SHARE_REQUEST,
        payload: payload
    }
}

// GET FINAL STUDENTS LIST
export const actionGetFinalStudentsListSaga = (payload) => {
    return {
        type: ACTION_GET_CAMPUS_DRIVE_FINAL_STUDENTS_LIST_REQUEST,
        payload: payload
    }
}

// POST STUDENT OFFER LETTERS
export const actionPostStudentOfferLetterSaga = (payload) => {
    return {
        type: ACTION_POST_CAMPUS_DRIVE_OFFER_LETTERS_REQUEST,
        payload: payload
    }
}

// GET SINGLE OFFER LETTER
export const actionGetCampusDriveOfferLetterRequest = (payload) => {
    return {
        type: ACTION_GET_CAMPUS_DRIVE_OFFER_LETTER_REQUEST,
        payload: payload
    }
}