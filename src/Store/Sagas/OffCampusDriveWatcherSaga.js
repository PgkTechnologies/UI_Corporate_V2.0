import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import Axios from '../../utils/Axios';
import {
    ACTION_GET_ALL_OFF_CAMPUS_DRIVES_REQUEST,
    ACTION_POST_ADD_NEW_OFF_CAMPUS_REQUEST,
    ACTION_POST_ADD_ALL_PUBLISHED_JOBS_REQUEST,
    ACTION_GET_OFF_CAMPUS_PUBLISHED_JOBS_REQUEST,
    ACTION_GET_OFF_CAMPUS_DRIVE_JOBS_REQUEST
} from '../Actions/SagaActions/SagaActionTypes';
import { actionUpdateGlobalLoaderSagaAction } from '../Actions/SagaActions/CommonSagaActions';

const getOffCampusDriveJobsRequest = (driveID) => {
    const URL = '/cdj/offCampus/jobs/published/' + driveID;
    return Axios.get(URL).then(resp => resp.data);
}

function* getOffCampusDriveJobsRequestSaga(action) {
    try {
        yield put(actionUpdateGlobalLoaderSagaAction(true));
        const data = yield call(getOffCampusDriveJobsRequest, action.payload.driveID);
        action.payload.callback(data);
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



const getPublishedJobsRequest = () => {
    const URL = '/p/crp/publishJob/all';
    return Axios.get(URL).then(resp => resp.data);
}

function* getPublishedJobsRequestSaga(action) {
    try {
        yield put(actionUpdateGlobalLoaderSagaAction(true));
        const data = yield call(getPublishedJobsRequest);
        action.payload.callback(data);
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

const getAllOffCampusDrives = (page, size) => {
    const URL = `/cdj/offCampus/all?page=${page}&size=${size}`;
    return Axios.get(URL).then(resp => resp.data);
}

function* getAllOffCampusDrivesRequest(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const response = yield call(getAllOffCampusDrives, action.payload.page, action.payload.size);

        if (action?.payload?.callback) {
            action.payload.callback(response);
        }
        //console.log(JSON.stringify(response))
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

const postNewOffCampusDrive = (newDriveInfo) => {
    const URL = '/cdj/offCampus/new';
    return Axios.post(URL, newDriveInfo).then(resp => resp.data);
}

function* posNewOffCampusDriveRequest(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const formData = new FormData();
        for (const key in action.payload.newDriveInformation) {
            formData.append(key, action.payload.newDriveInformation[key]);
        }
        const response = yield call(postNewOffCampusDrive, formData);

        if (action?.payload?.callback) {
            action.payload.callback(response);
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

const postPublisedJobsCampusDrive = (publishedJobs) => {
    const URL = '/cdj/offCampus/addJobs';
    return Axios.post(URL, publishedJobs).then(resp => resp.data);
}

function* postPublisedJobsCampusDriveRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const response = yield call(postPublisedJobsCampusDrive, action.payload.publishedJobs);

        if (action?.payload?.callback) {
            action.payload.callback(response);
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

export default function* OffCampusDriveWatcherSaga() {
    yield takeLatest(ACTION_GET_ALL_OFF_CAMPUS_DRIVES_REQUEST, getAllOffCampusDrivesRequest);
    yield takeLatest(ACTION_POST_ADD_NEW_OFF_CAMPUS_REQUEST, posNewOffCampusDriveRequest);
    yield takeLatest(ACTION_GET_OFF_CAMPUS_PUBLISHED_JOBS_REQUEST, getPublishedJobsRequestSaga);
    yield takeLatest(ACTION_GET_OFF_CAMPUS_DRIVE_JOBS_REQUEST, getOffCampusDriveJobsRequestSaga);
    yield takeLatest(ACTION_POST_ADD_ALL_PUBLISHED_JOBS_REQUEST, postPublisedJobsCampusDriveRequestSaga);
}
