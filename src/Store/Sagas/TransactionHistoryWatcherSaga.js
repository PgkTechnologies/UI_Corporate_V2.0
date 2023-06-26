import { call, takeLatest, put } from 'redux-saga/effects';
import Axios from "../../utils/Axios";
import { toast } from "react-toastify";
import {
    ACTION_GET_TRANSACTION_HISTORY_REQUEST
} from "../Actions/SagaActions/SagaActionTypes";

import { actionUpdateGlobalLoaderSagaAction } from '../Actions/SagaActions/CommonSagaActions';

function getAllTransactionsFromServer(page, size) {
    const URL = `/t/allTransactions?page=${page}&size=${size}`;
    return Axios.get(URL).then(res => res.data);
}

function* getAllTransactions(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const resp = yield call(getAllTransactionsFromServer,
            action.payload.page,
            action.payload.size
            );
        if(action.payload.callback) {
            action.payload.callback(resp);
        }
    } catch (err) {
        if (err?.response) {
            toast.error(err?.response?.data?.errors[0]?.message);
        } else {
            //toast.error("Something Wrong!", err?.message);
        }
    } finally {
      yield put(actionUpdateGlobalLoaderSagaAction(false));
    }
}

export default function* TransactionHistoryWatcherSaga() {
    yield takeLatest(ACTION_GET_TRANSACTION_HISTORY_REQUEST, getAllTransactions);
}