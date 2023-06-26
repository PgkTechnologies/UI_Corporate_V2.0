import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import Axios from '../../utils/Axios';
// import { HiringSagaAction } from '../Actions/SagaActions/HiringSagaAction';
import {
    ACTION_GET_CAMPUS_DRIVE_INVITES_REQUEST,
    ACTION_POST_RESPOND_TO_CAMPUS_DRIVE_REQUEST_REQUEST,
    ACTION_GET_CAMPUS_DRIVE_ACCEPTED_INVITES_LIST_REQUEST,
    ACTION_POST_CAMPUS_DRIVE_CLOSE_REQUEST,
    ACTION_GET_CAMPUS_DRIVE_STUDENT_RESUME_REQUEST,
    ACTION_GET_STUDENT_GAPS_INFO_REQUEST,
    ACTION_GET_STUDENT_PROFILE_AND_HIRING_REQUEST
} from '../Actions/SagaActions/SagaActionTypes';
import { actionUpdateGlobalLoaderSagaAction } from '../Actions/SagaActions/CommonSagaActions';


const postRespondToCampusDriveRequest = (listOfHiringCriteria) => {
    const URL = '/s/subscribe/campusDrive/respond';
    return Axios.post(URL, listOfHiringCriteria).then(resp => resp.data);
}

function* postRespondToCampusDriveRequestRequest(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const model = action.payload.apiPayloadRequest;
        let formData = new FormData();
        
        for (const key in model) {
            formData.append(key, model[key]);
        }

        yield call(postRespondToCampusDriveRequest, formData);
        action.payload.callback();

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

const getCampusDriveInvites = (id) => {
    const URL = '/s/campusInvites';
    return Axios.get(URL).then(resp => resp.data);
}

function* getCampusDriveInvitesRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const response = yield call(getCampusDriveInvites);

        if(action?.payload?.callback) {
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

// FETCH CAMPUS DRIVE ACCEPTED INVITES LIST FOR CAMPUS DRIVE WORKFLOW
const getCampusDriveAcceptedInvitesList = (page, size) => {
    const URL = `s/campusInvites/Accepted?page=${page}&size=${size}`;
    return Axios.get(URL).then(resp => resp.data);
}

function* getCampusDriveAcceptedInvitesListRequest(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const response = yield call(getCampusDriveAcceptedInvitesList, action.payload.page, action.payload.size);

        if(action?.payload?.callback) {
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

// POST CAMPUS DRIVE CLOSE REQUEST
const postCampusDriveCloseRequest = (action) => {
    const URL = `/ci/closeCampusDrive/${action?.payload?.apiPayloadRequest?.campusDriveId}`;
    return Axios.post(URL).then(resp => resp.data);
}
function* postCampusDriveCloseRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const response = yield call(postCampusDriveCloseRequest, action);

        if(action?.payload?.callback) {
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

// GET CAMPUS DRIVE STUDENT RESUME REQUEST
const getCampusDriveStudentResume = (action) => {
    const URL = `/ci/ir/resume?studentID=${action?.payload?.apiPayloadRequest?.studentId}&resumeID=${action?.payload?.apiPayloadRequest?.resumeId}`;
    return Axios.get(URL).then(resp => resp.data);
}

function* getCampusDriveStudentResumeSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const response = yield call(getCampusDriveStudentResume, action);

        if(action?.payload?.callback) {
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

// ON CAMPUS - JOB DETAILS - APPLY TO JOBS - HC AND STUDENT INFO
const getOnCampusJobDetailsApplyToJobsHcAndStudentInfoRequest = (action) => {
    const URL = `/cdj/hc/hcStudentInfo/${action?.payload?.apiPayloadRequest?.campusDriveId}/${action?.payload?.apiPayloadRequest?.hcId}/${action?.payload?.apiPayloadRequest?.jobId}?studentID=${action?.payload?.apiPayloadRequest?.studentID}`;
    return Axios.get(URL).then((res) => {
        return res.data;
    });
}

function* getOnCampusJobDetailsApplyToJobsHcAndStudentInfoRequestSaga(action) {
    try {
        const response = yield call(getOnCampusJobDetailsApplyToJobsHcAndStudentInfoRequest, action);

        if (action?.payload?.callback) {
            action.payload.callback(response);
        }
    } catch (err) {
        if (err.response) {
            toast.error(err?.response?.data?.errors?.length && err?.response?.data?.errors[0]?.message);
        } else {
            //toast.error("Something Wrong!", err.message);
        }
    }
}

const getStudentGapsInfo = (model) => {
    const URL = "/u/stu/eduGaps/" + model.studentID;
    return Axios.get(URL).then((res) => {
        return res.data;
    });
}

function* getStudentGapsInfoRequestSaga(action) {
    try {
        const model = action.payload.apiPayloadRequest;
        const response = yield call(getStudentGapsInfo, model);
        action.payload.callback(response);
    } catch (err) {
        if (err.response) {
            toast.error(err?.response?.data?.errors?.length && err?.response?.data?.errors[0]?.message);
        } else {
            //toast.error("Something Wrong!", err.message);
        }
    }
}

export default function* CampusDriveWatcherSaga() {
    yield takeLatest(ACTION_GET_CAMPUS_DRIVE_INVITES_REQUEST, getCampusDriveInvitesRequestSaga);
    yield takeLatest(ACTION_POST_RESPOND_TO_CAMPUS_DRIVE_REQUEST_REQUEST, postRespondToCampusDriveRequestRequest);
    yield takeLatest(ACTION_GET_CAMPUS_DRIVE_ACCEPTED_INVITES_LIST_REQUEST, getCampusDriveAcceptedInvitesListRequest);
    yield takeLatest(ACTION_POST_CAMPUS_DRIVE_CLOSE_REQUEST, postCampusDriveCloseRequestSaga);
    yield takeLatest(ACTION_GET_CAMPUS_DRIVE_STUDENT_RESUME_REQUEST, getCampusDriveStudentResumeSaga);
    yield takeLatest(ACTION_GET_STUDENT_GAPS_INFO_REQUEST, getStudentGapsInfoRequestSaga);
    yield takeLatest(ACTION_GET_STUDENT_PROFILE_AND_HIRING_REQUEST, getOnCampusJobDetailsApplyToJobsHcAndStudentInfoRequestSaga);
}
