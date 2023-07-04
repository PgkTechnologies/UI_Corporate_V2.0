import {
    ACTION_GET_CORPORATE_NOTIFICATIONS_REQUEST,
    ACTION_GET_CORPORATE_SINGLE_NOTIFICATION_REQUEST,
    ACTION_POST_CORPORATE_RESPOND_TO_CAMPUS_DRIVE_REQUEST
} from "./SagaActionTypes";


export const GetNotificationsSagaAction = (payload) => {
    return {
        type: ACTION_GET_CORPORATE_NOTIFICATIONS_REQUEST,
        payload: payload
    }
}

export const actionGetCorporateSingleNotificationRequest = (payload) => {
    return {
        type: ACTION_GET_CORPORATE_SINGLE_NOTIFICATION_REQUEST,
        payload: payload
    }
}

export const actionSagaPostCorporateRespondToCampusDriveRequest = (payload) => {
    return {
        type: ACTION_POST_CORPORATE_RESPOND_TO_CAMPUS_DRIVE_REQUEST,
        payload: payload
    }
}