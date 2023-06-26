import { call, takeLatest, put, take } from 'redux-saga/effects';
import Axios from "../../utils/Axios";
import { toast } from "react-toastify";

import {
    ACTION_GET_CORPORATE_TOKENS_REQUEST,
    ACTION_GET_CORPORATE_TOKENS_RESPONSE,
    ACTION_GET_CORPORATE_PROFILE_STATS_REQUEST,
    ACTION_GET_CORPORATE_LIST_REQUEST,
    ACTION_GET_UNIVERSITY_LIST_REQUEST,
    ACTION_GET_PROPOSAL_DATA_AVAILABLE_REQUEST
} from "../Actions/SagaActions/SagaActionTypes";

import { ProposalStoreData, actionUpdateGlobalLoaderSagaAction } from '../Actions/SagaActions/CommonSagaActions';


const getTokens = () => {
    const URL = '/t/balance';
    return Axios.get(URL).then(res => res.data);
}

function* getTokensSaga() {
    try {
        yield put(actionUpdateGlobalLoaderSagaAction(true));

        const resp = yield call(getTokens);
        yield put({ type: ACTION_GET_CORPORATE_TOKENS_RESPONSE, payload: resp })
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

const getCorporateProfileStats = () => {
    const URL = '/u/profile/stats';
    return Axios.get(URL).then(res => res.data);
}

function* getCorporateProfileStatsSaga(action) {
    try {
        yield put(actionUpdateGlobalLoaderSagaAction(true));

        const resp = yield call(getCorporateProfileStats);
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

const getUniversityRegisteredRequest = (page, size) => {
    const URL = `u/tp/newlyRegisteredUniversities?page=${page}&size=${size}`;
    return Axios.get(URL).then((res) => {
      return res.data;
    });
  };
  
  const getCorporateRegisteredRequest = (page, size) => {
    const URL = `u/tp/newlyRegisteredCorporates?page=${page}&size=${size}`;
    return Axios.get(URL).then((res) => {
      return res.data;
    });
  };

function* getUniversityListRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    try {
        const response = yield call(getUniversityRegisteredRequest, action.payload.page, action.payload.size);
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

function* getCorporateListRequestSaga(action) {
   
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    try {
        const response = yield call(getCorporateRegisteredRequest, action.payload.page, action.payload.size);
        action.payload.callback(response);
        console.log(response, 'res')
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
//Get all store data or Proposal Data
export function getProposalDataRequest(formData) {
    const URL = "/p/unv/proposal/";
    return Axios.get(URL, formData, { contentType: "application/json" }).then(
      (res) => res.data
    );
  }

//Get Proposal Data
function* getProposalDataRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    try {
      const response = yield call(getProposalDataRequest);
      yield put(ProposalStoreData(response));
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
  

export default function* DashboardWatcherSaga() {
    yield takeLatest(ACTION_GET_CORPORATE_TOKENS_REQUEST, getTokensSaga);
    yield takeLatest(ACTION_GET_CORPORATE_PROFILE_STATS_REQUEST, getCorporateProfileStatsSaga);
    yield takeLatest (ACTION_GET_CORPORATE_LIST_REQUEST ,getCorporateListRequestSaga);
    yield takeLatest (ACTION_GET_UNIVERSITY_LIST_REQUEST ,getUniversityListRequestSaga )
    yield takeLatest ( ACTION_GET_PROPOSAL_DATA_AVAILABLE_REQUEST,getProposalDataRequestSaga)
}