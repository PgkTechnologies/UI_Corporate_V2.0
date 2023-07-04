import { ACTION_POST_ADD_OTHER_INFORMATION_REQUEST, ACTION_POST_PUBLISH_OTHER_INFORMATION_REQUEST, ACTION_GET_PUBLISH_OTHER_INFORMATION_LIST_REQUEST } from "./SagaActionTypes"

export const actionPostAddOtherInformationRequest = (payload) => {
    return {
        type: ACTION_POST_ADD_OTHER_INFORMATION_REQUEST,
        payload: payload
    }
}

export const actionPostPublishOtherInformationRequest = (payload) => {
    return {
        type: ACTION_POST_PUBLISH_OTHER_INFORMATION_REQUEST,
        payload: payload
    }
}

export const actionGetPublishOtherInformationListRequest = (payload) => {
    return {
        type: ACTION_GET_PUBLISH_OTHER_INFORMATION_LIST_REQUEST,
        payload: payload
    }
}