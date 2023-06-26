import { call, takeLatest, put } from 'redux-saga/effects';
import Axios from "../../utils/Axios";
import { toast } from "react-toastify";
import {
    ACTION_GET_TICKET_CONVO_REQUEST,
    ACTION_POST_SUPPORT_REQUEST,
    ACTION_GET_ALL_TICKETS_REQUEST,
    ACTION_CLOSE_TICKET_REQUEST
} from "../Actions/SagaActions/SagaActionTypes";

import { actionUpdateGlobalLoaderSagaAction } from '../Actions/SagaActions/CommonSagaActions';

function postSupportRequest(formData) {
    const URL = "/support/add";
    return Axios.post(URL, formData, { contentType: "application/json" }).then(
      (res) => res
    ); 
  }


function* postSupportRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    try {
        const response = yield call(postSupportRequest, action.payload.apiPayloadRequest);
        action.payload.callback(response);
    } catch (err) {
        if (err.response) {
            toast.error(err.response.data.errors[0].message);
        } else {
            //toast.error("Something Wrong!", err.message);
        }
    } finally {
        yield put(actionUpdateGlobalLoaderSagaAction(false));
    }
}


function getAllSupportTicketsRequest() {
    const URL = "/support/";
    return Axios.get(URL, { contentType: "application/json" }).then(
      (res) => res.data
    );
  }


function* getAllSupportTicketsRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    try {
        const response = yield call(getAllSupportTicketsRequest);
        action.payload.callback(response);
    } catch (err) {
        if (err.response) {
            toast.error(err.response.data.errors[0].message);
        } else {
            //toast.error("Something Wrong!", err.message);
        }
    } finally {
        yield put(actionUpdateGlobalLoaderSagaAction(false));
    }
}

function getSupportTicketConvoRequest(ticket) {
    const URL = `/support/${ticket}`;
    return Axios.get(URL, { contentType: "application/json" }).then(
      (res) => res.data
    );
  }



function* getSupportTicketConvoRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    try {
        const response = yield call(getSupportTicketConvoRequest, action.payload.ticket);
        action.payload.callback(response);
    } catch (err) {
        if (err.response) {
            toast.error(err.response.data.errors[0].message);
        } else {
            //toast.error("Something Wrong!", err.message);
        }
    } finally {
        yield put(actionUpdateGlobalLoaderSagaAction(false));
    }
}
const closeSupportTicketRequest = (ticket) => {
    const URL = `/support/${ticket}`;
    return Axios.delete(URL).then((res) => {
        return res.data;
    });
  };
  
function* closeSupportTicketRequestSaga(action) {
    try {
        const response = yield call(closeSupportTicketRequest, action.payload.ticket);
        action.payload.callback(response);
    } catch (err) {
        if (err?.response) {
            toast.error(err?.response?.data?.errors[0]?.message);
        } else {
            //toast.error("Something Wrong!", err?.message);
        }
    }
  }

export default function* SupportWatcherSaga() {
    yield takeLatest(
        ACTION_POST_SUPPORT_REQUEST,
        postSupportRequestSaga
    );

    yield takeLatest(
        ACTION_GET_ALL_TICKETS_REQUEST,
        getAllSupportTicketsRequestSaga
    );

    yield takeLatest(
        ACTION_GET_TICKET_CONVO_REQUEST,
        getSupportTicketConvoRequestSaga
    );
    yield takeLatest(ACTION_CLOSE_TICKET_REQUEST, closeSupportTicketRequestSaga);
}