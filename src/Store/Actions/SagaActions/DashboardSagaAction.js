import { ACTION_GET_CORPORATE_TOKENS_REQUEST, ACTION_GET_CORPORATE_PROFILE_STATS_REQUEST } from "./SagaActionTypes"

export const getTokensSagaAction = (payload) => {
    return {
        type: ACTION_GET_CORPORATE_TOKENS_REQUEST,
        payload: payload,
    }
}

export const getCorporateProfileStats = (payload) => {
    return {
        type: ACTION_GET_CORPORATE_PROFILE_STATS_REQUEST,
        payload: payload,
    }
}