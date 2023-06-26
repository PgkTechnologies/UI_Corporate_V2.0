import {ACTION_GET_ANALYTICS_BI_ACCESS_TOKEN_REQUEST, ACTION_GET_ANALYTICS_BI_REPORT_IDS_REQUEST} from './SagaActionTypes';

export const actionGetAnalyticsBiAccessTokenRequest = (payload) => {
    return {
        type: ACTION_GET_ANALYTICS_BI_ACCESS_TOKEN_REQUEST,
        payload: payload
    }
}

export const actionGetAnalyticsBiReportIdsRequest = (payload) => {
    return {
        type: ACTION_GET_ANALYTICS_BI_REPORT_IDS_REQUEST,
        payload: payload
    }
}