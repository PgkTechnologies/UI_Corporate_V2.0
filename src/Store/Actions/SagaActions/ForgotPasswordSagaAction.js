import {
    ACTION_POST_VALIDATE_EMAIL_MOBILE_REQUEST,
    ACTION_POST_SUBMIT_NEW_PASSWORD
} from "./SagaActionTypes"

export const actionPostValidateEmailMobileRequest = (payload) => {
    return {
        type: ACTION_POST_VALIDATE_EMAIL_MOBILE_REQUEST,
        payload: payload
    }
}

export const actionPostSubmitNewPasswordRequest = (payload) => {
    return {
        type: ACTION_POST_SUBMIT_NEW_PASSWORD,
        payload: payload
    }
}
