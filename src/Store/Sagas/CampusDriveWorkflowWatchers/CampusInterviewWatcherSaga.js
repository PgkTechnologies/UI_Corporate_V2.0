import { call, takeLatest, put } from 'redux-saga/effects';
import Axios from "../../../utils/Axios";
import { toast } from "react-toastify";
import {
    ACTION_GET_CAMPUS_DRIVE_INTERVIEW_ROUNDS_REQUEST,
    ACTION_GET_CAMPUS_DRIVE_INTERVIEW_STUDENTS_LIST_REQUEST,
    ACTION_POST_CAMPUS_DRIVE_INTERVIEW_STUDENTS_LIST_REQUEST,
    ACTION_GET_CAMPUS_DRIVE_FINAL_STUDENTS_LIST_REQUEST,
    ACTION_POST_CAMPUS_DRIVE_OFFER_LETTERS_REQUEST,
    ACTION_GET_CAMPUS_DRIVE_OFFER_LETTER_REQUEST,
    ACTION_POST_CAMPUS_DRIVE_INTERVIEW_STUDENTS_LIST_SHARE_REQUEST,
} from '../../Actions/SagaActions/SagaActionTypes';
import { actionUpdateGlobalLoaderSagaAction } from '../../Actions/SagaActions/CommonSagaActions';

// GET INTERVIEW ROUNDS - CAMPUS DRIVE
const getInterviewRoundsRequest = (model) => {
    const URL = '/ci/ir/rounds/' + model.campusDriveID + "/" + model.jobID;
    return Axios.get(URL, model).then(resp => resp.data);
}

function* getInterviewRoundsRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    try {
        const model = action.payload.apiPayloadRequest;
        const data = yield call(getInterviewRoundsRequest, model);
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

// GET STUDENTS LIST FOR SPECIFIC ROUND - CAMPUS DRIVE
const getStudentsListRequest = (model) => {
    const URL = '/ci/ir/studentsList?' + model;
    return Axios.get(URL).then(resp => resp.data);
}

function* getStudentsListRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    try {
        const model = action.payload.apiPayloadRequest;
        const data = yield call(getStudentsListRequest, model);
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

// POST STUDENTS LIST FOR SPECIFIC ROUND - CAMPUS DRIVE
const postStudentsListRequest = (model) => {
    const URL = '/ci/ir/captureResults';
    return Axios.post(URL, model).then(resp => resp.data);
}

function* postStudentsListRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    try {
        const model = action.payload.apiPayloadRequest;
        const data = yield call(postStudentsListRequest, model);
        action.payload.callback(data);
    } catch (err) {
        if (err.response) {
            toast.error(err?.response?.data?.errors?.length && err?.response?.data?.errors[0]?.message);
        } else {
            //toast.error("Something Wrong!", err);
        }
    } finally {
        yield put(actionUpdateGlobalLoaderSagaAction(false));
    }
}

// GET STUDENTS FINAL LIST - CAMPUS DRIVE
const getFinalStudentsListRequest = (model) => {
    const URL = '/ci/ir/selectedStudents?cdID=' + model.campusDriveID + '&jobID=' + model.jobID + '&selectedStudents=true';
    return Axios.get(URL).then(resp => resp.data);
}

function* getFinalStudentsListRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    try {
        const model = action.payload.apiPayloadRequest;
        const data = yield call(getFinalStudentsListRequest, model);
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

// POST STUDENTS OFFER LETTERS
const postStudentOfferLettersRequest = (model) => {
    const URL = '/ci/ir/releaseOffers';
    return Axios.post(URL, model).then(resp => resp.data);
}

function* postStudentsListOfferLettersSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    try {
        const model = action.payload.apiPayloadRequest;
        const data = yield call(postStudentOfferLettersRequest, model);
        action.payload.callback(data);
    } catch (err) {
        if (err.response) {
            toast.error(err?.response?.data?.errors?.length && err?.response?.data?.errors[0]?.message);
        } else {
            //toast.error("Something Wrong!", err);
        }
    } finally {
        yield put(actionUpdateGlobalLoaderSagaAction(false));
    }
}

// GET CAMPUS DRIVE OFFER LETTER REQUEST
const getCampusDriveOfferLetterRequest = (apiPayloadRequest) => {
    const URL = `/ci/ir/offerLetter?studentID=${apiPayloadRequest?.studentID}&attachmentID=${apiPayloadRequest?.offerLetterID}`;
    return Axios.get(URL).then(resp => resp.data);
}

function* getCampusDriveOfferLetterRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    try {
        const data = yield call(getCampusDriveOfferLetterRequest, action?.payload?.apiPayloadRequest);
        if(action?.payload?.callback) {
            action.payload.callback(data);
        }
    } catch (err) {
        if (err.response) {
            toast.error(err?.response?.data?.errors?.length && err?.response?.data?.errors[0]?.message);
        } else {
            //toast.error("Something Wrong!", err);
        }
    } finally {
        yield put(actionUpdateGlobalLoaderSagaAction(false));
    }
}

const postCampusDriveStudentsListShareRequest = (formData) => {
    const URL = '/ci/ir/shareResults';
    return Axios.post(URL, formData).then(resp => resp.data);
}

function* postCampusDriveStudentsListShareRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    try {
        const model = action?.payload?.apiPayloadRequest;
        let formData = new FormData();
        for (const key in model) {
            formData.append(key, model[key]);
        }

        const data = yield call(postCampusDriveStudentsListShareRequest, formData);
        if(action?.payload?.callback) {
            action.payload.callback(data);
        }
    } catch (err) {
        if (err.response) {
            toast.error(err?.response?.data?.errors?.length && err?.response?.data?.errors[0]?.message);
        } else {
            //toast.error("Something Wrong!", err);
        }
    } finally {
        yield put(actionUpdateGlobalLoaderSagaAction(false));
    }
}

export default function* CampusInterviewWatcherSaga() {
    yield takeLatest(ACTION_GET_CAMPUS_DRIVE_INTERVIEW_ROUNDS_REQUEST, getInterviewRoundsRequestSaga);
    yield takeLatest(ACTION_GET_CAMPUS_DRIVE_INTERVIEW_STUDENTS_LIST_REQUEST, getStudentsListRequestSaga);
    yield takeLatest(ACTION_POST_CAMPUS_DRIVE_INTERVIEW_STUDENTS_LIST_REQUEST, postStudentsListRequestSaga);
    yield takeLatest(ACTION_GET_CAMPUS_DRIVE_FINAL_STUDENTS_LIST_REQUEST, getFinalStudentsListRequestSaga);
    yield takeLatest(ACTION_POST_CAMPUS_DRIVE_OFFER_LETTERS_REQUEST, postStudentsListOfferLettersSaga);
    yield takeLatest(ACTION_GET_CAMPUS_DRIVE_OFFER_LETTER_REQUEST, getCampusDriveOfferLetterRequestSaga);
    yield takeLatest(ACTION_POST_CAMPUS_DRIVE_INTERVIEW_STUDENTS_LIST_SHARE_REQUEST, postCampusDriveStudentsListShareRequestSaga);
}
