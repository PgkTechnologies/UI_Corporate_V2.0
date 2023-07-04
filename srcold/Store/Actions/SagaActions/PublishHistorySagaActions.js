import { ACTION_GET_PUBLISH_HISTORY_REQUEST, ACTION_GET_PUBLISH_HISTORY_ITEM_BY_ID_REQUEST } from "./SagaActionTypes"

export const actionGetPublishHistoryRequest = (payload) => {
    return {
        type: ACTION_GET_PUBLISH_HISTORY_REQUEST,
        payload: payload
    }
}

export const actionGetPublishHistoryItemByIdRequest = (payload) => {
    return {
        type: ACTION_GET_PUBLISH_HISTORY_ITEM_BY_ID_REQUEST,
        payload: payload
    }
}