import { call, takeLatest, put } from 'redux-saga/effects';
import Axios from "../../utils/Axios";
import { toast } from "react-toastify";
import {
    ACTION_GET_ANALYTICS_BI_ACCESS_TOKEN_REQUEST,
    ACTION_GET_ANALYTICS_BI_REPORT_IDS_REQUEST,
} from "../Actions/SagaActions/SagaActionTypes";

import { actionUpdateGlobalLoaderSagaAction } from '../Actions/SagaActions/CommonSagaActions';

const getAnalyticsBiAccessTokenRequest = (formData) => {
    const URL = "/ak/token";
    return Axios.get(URL).then((res) => {
        return res.data;
    });
}


function* getAnalyticsBiAccessTokenRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const response = yield call(getAnalyticsBiAccessTokenRequest);
        if (response?.accessToken) {
            action.payload.callback(response);
        } else {
            toast.error("Something went wrong!");
        }
    } catch (err) {
        if (err.response) {
            toast.error(err?.response?.data?.errors?.length && err?.response?.data?.errors[0]?.message);
        } else {
            //toast.error("Something Wrong!", err.message);
        }
    } finally {
        yield put(actionUpdateGlobalLoaderSagaAction(false));
    }
}


// GET REPORT IDS
const getReportIdsRequest = () => {
    const URL = "/lut/reportInfo";
    return Axios.get(URL).then((res) => {
        return res.data;
    });
}

function* getReportIdsRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const response = yield call(getReportIdsRequest);
        if (response) {
            action.payload.callback(response);
        } else {
            toast.error("Something went wrong!");
        }
    } catch (err) {
        if (err.response) {
            toast.error(err?.response?.data?.errors?.length && err?.response?.data?.errors[0]?.message);
        } else {
            //toast.error("Something Wrong!", err.message);
        }
    } finally {
        yield put(actionUpdateGlobalLoaderSagaAction(false));
    }
}

export default function* AnalyticsWatcherSaga() {
    yield takeLatest(ACTION_GET_ANALYTICS_BI_ACCESS_TOKEN_REQUEST, getAnalyticsBiAccessTokenRequestSaga);
    yield takeLatest(ACTION_GET_ANALYTICS_BI_REPORT_IDS_REQUEST, getReportIdsRequestSaga);
}