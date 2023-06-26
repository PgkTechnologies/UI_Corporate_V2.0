import { call, takeLatest, put } from 'redux-saga/effects';
import Axios from "../../utils/Axios";
import { toast } from "react-toastify";
import {
    ACTION_GET_CORPORATE_HISTORY_UNIVERSITY_REQUEST,
    ACTION_GET_CORPORATE_SUBSCRIBE_TOKENS_REQUEST,
    ACTION_GET_CORPORATE_SUBSCRIBE_UNIVERSITY_REQUEST,
    ACTION_GET_CORPORATE_SUBSCRIBE_UNV_INFO_REQUEST,
    ACTION_POST_CORPORATE_SUBSCRIBESEARCH_REQUEST,
    ACTION_GET_CORPORATE_UNIVERSITY_SUBSCRIPTION_HISTORY_REQUEST,
    ACTION_POST_CORPORATE_SENDMAIL_TO_UNIVERSITY_REQUEST,
    ACTION_POST_CORPORATE_STUDENT_SEARCH_REQUEST,
    ACTION_GET_CORPORATE_SINGLE_SUBSCRIPTION_REQUEST
} from "../Actions/SagaActions/SagaActionTypes";
import { getTokensSagaAction } from '../Actions/SagaActions/DashboardSagaAction';

import { actionUpdateGlobalLoaderSagaAction } from '../Actions/SagaActions/CommonSagaActions';

const getSearchData = (params,page,size) => {
    const URL = `/u/unv/search?universityName=${params}&page=${page}&size=${size}`;   //ehtasham 14 march
    return Axios.get(URL).then(res => res?.data);
}

function* getSearchDataSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const params = action.payload.apiPayloadRequest;
        const page = action.payload.page;
        const size = action.payload.size;
        const resp = yield call(getSearchData, params, page, size);
        action.payload.callback(resp);
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

const getUniversityInfo = (id) => {
    const URL = '/u/unv/search/' + id;
    return Axios.get(URL).then(res => res.data);
}

function* getUniversityInfoSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const payload = action.payload.apiPayloadRequest;
        const resp = yield call(getUniversityInfo, payload);
        if (resp) {
            for (const key in resp) {
                if (key === 'accredations' || key === 'ranking') {
                    if (resp[key]) {
                        resp[key] = JSON.parse(resp[key])
                    }
                }
                resp[key] = resp[key]
            }
        } else {
            resp = {};
        }
        action.payload.callback(resp);
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

const getUniversityHistoryInfo = (id) => {
    const URL = '/p/subData/publishedData/' + id;
    return Axios.get(URL).then(res => res.data);
}

function* getUniversityHistoryInfoSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const payload = action.payload.apiPayloadRequest;
        const resp = yield call(getUniversityHistoryInfo, payload);
        if (resp) {
            // const parseResp = JSON.parse(resp);
            action.payload.callback(JSON.parse(resp));
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

const getSubscribeTokens = (id) => {
    const URL = '/s/payment/' + id;
    return Axios.get(URL).then(res => res.data);
}

function* getSubscribeTokensSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const payload = action.payload.apiPayloadRequest;
        const resp = yield call(getSubscribeTokens, payload);
        action.payload.callback(resp);
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

const subscribeUnvInfo = (payload, type) => {
    if (type === 'UP' || type === 'UO') {
        const URL = '/s/subscribe/general/' + type;
        return Axios.post(URL, payload).then(res => res.data);
    } else {
        const URL = '/s/subscribe/' + type;
        return Axios.post(URL, payload).then(res => res.data);
    }
}

function* subscribeUnvInfoSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const model = action.payload.apiPayloadRequest;
        const type = action.payload.type;
        let formData = new FormData();
        for (const key in model) {
            formData.append(key, model[key]);
        }
        const resp = yield call(subscribeUnvInfo, formData, type);
        toast.success(resp?.message)
        // if (resp?.message === "Successfully subscribed") {
        // } else {
        //     toast.error("Not subscribed!");
        // }
        // console.log(resp);
        yield put(getTokensSagaAction());
        action.payload.callback(resp);
    }
    catch (err) {
        if (err?.response) {
            alert(' "Insufficient Tokens, Please purchase Tokens to proceed further" ');  //ehtashamm added alert on feb 16
        } else {
            //toast.error("Something Wrong!", err?.Message);
        }
    } 
    finally {
        yield put(actionUpdateGlobalLoaderSagaAction(false));
    }
}

function getCorporateUniversitySubscriptionHistory() {
    const URL = '/s/subscriptions';
    return Axios.get(URL).then(res => res.data);
}

function* getCorporateUniversitySubscriptionHistoryRequest(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const resp = yield call(getCorporateUniversitySubscriptionHistory);
        action.payload.callback(resp);
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

const sendMail = (payload) => {
    const URL = '/s/subscribe/campusDrive/invite';
    return Axios.post(URL, payload).then(res => res.data);
}

function* sendMailSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const model = action.payload.apiPayloadRequest;
        let formData = new FormData();
        for (const key in model) {
            formData.append(key, model[key]);
        }
        const resp = yield call(sendMail, formData);
        action.payload.callback(resp);
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

const searchStudent = (payload) => {
    const URL = '/s/subscribe/unvStuData/queryStuData';
    return Axios.post(URL, payload).then(res => res.data);
}

function* searchStudentSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const model = action.payload.apiPayloadRequest;
        const resp = yield call(searchStudent, model);
        action.payload.callback(resp);
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

const getSubscribedUniversityInfo = (id) => {
    const URL = '/s/subscribe/unvInsight/' + id;
    return Axios.get(URL).then(res => res.data);
}

const getSubscribedUniversityStudents = (id) => {
    const URL = '/s/subscribe/unvStuData/' + id;
    return Axios.get(URL).then(res => res.data);
}

const getUniversityPublishedInfo = (id) => {
    const URL = '/p/subData/publishedData/' + id;
    return Axios.get(URL).then(res => res.data);
}

function* getSingleSubscriptionRequest(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        let resp;

        if (action.payload.apiPayloadRequest.type === 'UNIVERSITY_INFO') {
            resp = yield call(getSubscribedUniversityInfo, action.payload.apiPayloadRequest.id);
        } else if (action.payload.apiPayloadRequest.type === 'STUDENTS_LIST') {
            resp = yield call(getSubscribedUniversityStudents, action.payload.apiPayloadRequest.id);
        } else if (['PROFILE', 'OTHER_INFORMATION'].includes(action.payload.apiPayloadRequest.type)) {
            resp = yield call(getUniversityPublishedInfo, action.payload.apiPayloadRequest.id);
        }
        action.payload.callback(resp);
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

export default function* SubscriptionWatcherSaga() {
    yield takeLatest(ACTION_POST_CORPORATE_SUBSCRIBESEARCH_REQUEST, getSearchDataSaga);
    yield takeLatest(ACTION_GET_CORPORATE_SUBSCRIBE_UNIVERSITY_REQUEST, getUniversityInfoSaga);
    yield takeLatest(ACTION_GET_CORPORATE_HISTORY_UNIVERSITY_REQUEST, getUniversityHistoryInfoSaga);
    yield takeLatest(ACTION_GET_CORPORATE_SUBSCRIBE_TOKENS_REQUEST, getSubscribeTokensSaga);
    yield takeLatest(ACTION_GET_CORPORATE_SUBSCRIBE_UNV_INFO_REQUEST, subscribeUnvInfoSaga);
    yield takeLatest(ACTION_GET_CORPORATE_UNIVERSITY_SUBSCRIPTION_HISTORY_REQUEST, getCorporateUniversitySubscriptionHistoryRequest);
    yield takeLatest(ACTION_POST_CORPORATE_SENDMAIL_TO_UNIVERSITY_REQUEST, sendMailSaga);
    yield takeLatest(ACTION_POST_CORPORATE_STUDENT_SEARCH_REQUEST, searchStudentSaga);
    yield takeLatest(ACTION_GET_CORPORATE_SINGLE_SUBSCRIPTION_REQUEST, getSingleSubscriptionRequest);
}