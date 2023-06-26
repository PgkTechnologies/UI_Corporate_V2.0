import { ACTION_GET_CORPORATE_PROFILE_REQUEST, ACTION_PATCH_CORPORATE_PROFILE_REQUEST, ACTION_POST_PUBLISH_CORPORATE_PROFILE_REQUEST, ACTION_GET_CORPORATE_PROFILE_RESPONSE, ACTION_PAYMENT_CORPORATE_EMAIL_REQUEST, ACTION_POST_UNIVERSITY_INVOICE_REQUEST } from './SagaActionTypes';

export const actionGetCorporateProfileSagaAction = (payload) => {
    return {
        type: ACTION_GET_CORPORATE_PROFILE_REQUEST,
        payload: payload,
    }
}

export const actionGetCorporateProfileResponse = (payload) => {
    return {
        type: ACTION_GET_CORPORATE_PROFILE_RESPONSE,
        payload: payload
    }
}

export const actionPatchCorporateProfileSagaAction = (payload) => {
    return {
        type: ACTION_PATCH_CORPORATE_PROFILE_REQUEST,
        payload: payload
    }
}

export const actionPostPublishCorporateProfileSagaAction = (payload) => {
    return {
        type: ACTION_POST_PUBLISH_CORPORATE_PROFILE_REQUEST,
        payload: payload
    }
}

export const actionGetPaymentEmailDetailsRequest = (payload) => {
    return {
        type: ACTION_PAYMENT_CORPORATE_EMAIL_REQUEST,
        payload: payload
    }
}
export const actionPostInvoiceSagaAction = (payload) => {
    return {
        type: ACTION_POST_UNIVERSITY_INVOICE_REQUEST,
        payload: payload
    }
}