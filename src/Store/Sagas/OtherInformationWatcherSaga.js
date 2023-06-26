// import packages
import { take, put, call, takeLatest } from "redux-saga/effects";
import Axios from "../../utils/Axios";
import { toast } from "react-toastify";
import history from '../../@history';
import { ACTION_POST_ADD_OTHER_INFORMATION_REQUEST, ACTION_POST_PUBLISH_OTHER_INFORMATION_REQUEST, ACTION_GET_PUBLISH_OTHER_INFORMATION_LIST_REQUEST } from '../Actions/SagaActions/SagaActionTypes';
import { actionUpdateGlobalLoaderSagaAction } from '../Actions/SagaActions/CommonSagaActions';

function postAddOtherInformationRequest(formData) {
  const URL = "/p/crp/oi/";
  return Axios.post(URL, formData).then((res) => {
    return res.data;
  });
}

function* postAddOtherInformationRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    let formData = new FormData();
    for (const key in action.payload.apiPayloadRequest) {
        formData.append(key, action.payload.apiPayloadRequest[key]);
    }
    const response = yield call(postAddOtherInformationRequest, formData);
    action.payload.callback(response);
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

const postPublishOtherInformation = (otherInformationId) => {
    const URL = '/p/crp/oi/publish/'+otherInformationId;
    return Axios.post(URL).then(resp => resp.data);
}

function* postPublishOtherInformationRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        for (let index = 0; index < action.payload.apiPayloadRequest.length; index++) {
          yield call(postPublishOtherInformation, action.payload.apiPayloadRequest[index]);
        }
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

const getPublishOtherInformationListRequest = () => {
  const URL = '/p/crp/oi/published';
  return Axios.get(URL).then(resp => resp.data);
}

function* getPublishOtherInformationListRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    const response = yield call(getPublishOtherInformationListRequest);
    action.payload.callback(response);
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

export default function* OtherInformationWatcherSaga() {
  yield takeLatest(ACTION_POST_ADD_OTHER_INFORMATION_REQUEST, postAddOtherInformationRequestSaga);
  yield takeLatest(ACTION_POST_PUBLISH_OTHER_INFORMATION_REQUEST, postPublishOtherInformationRequestSaga);
  yield takeLatest(ACTION_GET_PUBLISH_OTHER_INFORMATION_LIST_REQUEST, getPublishOtherInformationListRequestSaga);
}
