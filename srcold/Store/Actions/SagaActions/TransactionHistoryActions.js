import {ACTION_GET_TRANSACTION_HISTORY_REQUEST} from './SagaActionTypes';

export const getTransactionHistoryRequest = (payload) => {
    return {
        type: ACTION_GET_TRANSACTION_HISTORY_REQUEST,
        payload: payload
    }
}