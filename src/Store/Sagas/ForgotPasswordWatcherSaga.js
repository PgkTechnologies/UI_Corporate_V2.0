import { call, takeLatest } from 'redux-saga/effects';
import Axios from "../../utils/Axios";
import { toast } from "react-toastify";
import { ACTION_POST_VALIDATE_EMAIL_MOBILE_REQUEST, ACTION_POST_SUBMIT_NEW_PASSWORD } from '../Actions/SagaActions/SagaActionTypes';

const sendInputsForPassword = (model) => {
    const URL = '/o/sendPasswordOTP';
    let formData = new FormData();
    formData.append("stakeholder", model.stakeholder);
    formData.append("vrfBy", model.vrfBy);
    formData.append("userName", model.userName);
    return Axios.post(URL, formData).then((res) => { return res.data });
}

function* sendInputsForPasswordSaga(action) {
    try {
        const payload = action.payload.apiPayloadRequest;
        const resp = yield call(sendInputsForPassword, payload);
        action.payload.callback(resp);
    } catch (err) {
        if (err?.response) {
            toast.error(err?.response?.data?.errors[0]?.message);
            action.payload.callback("Error");
        }
    }
}

const validateOtpForPassword = (model) => {
    const URL = '/o/forgotPassword';
    let formData = new FormData();
    formData.append("stakeholder", model.stakeholder);
    formData.append("vrfBy", model.vrfBy);
    formData.append("otp", model.otp);
    formData.append("platformUUID", model.platformUUID);
    formData.append("newPassword", model.newPassword);
    return Axios.post(URL, formData).then((res) => { return res.data });
}

function* validateOtpForPasswordSaga(action) {
    try {
        const payload = action.payload.apiPayloadRequest;
        const resp = yield call(validateOtpForPassword, payload);
        action.payload.callback(resp);
        toast.success("Password Changed Successfully!");
    } catch (err) {
        action.payload.callback("Error");
        if (err?.response) {            
            toast.error(err?.response?.data?.errors[0]?.message);
        }
    }
}

export default function* ForgotPasswordWatcherSaga() {
    yield takeLatest(ACTION_POST_VALIDATE_EMAIL_MOBILE_REQUEST, sendInputsForPasswordSaga);
    yield takeLatest(ACTION_POST_SUBMIT_NEW_PASSWORD, validateOtpForPasswordSaga);
}