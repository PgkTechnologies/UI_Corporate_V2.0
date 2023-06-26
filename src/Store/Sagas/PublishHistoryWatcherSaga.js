// import packages
import { put, call, takeLatest } from "redux-saga/effects";
import Axios from "../../utils/Axios";
import { toast } from "react-toastify";
import { ACTION_GET_PUBLISH_HISTORY_REQUEST, ACTION_GET_PUBLISH_HISTORY_ITEM_BY_ID_REQUEST } from '../Actions/SagaActions/SagaActionTypes';
import { actionUpdateGlobalLoaderSagaAction } from '../Actions/SagaActions/CommonSagaActions';

const getPublishHistoryRequest = () => {
    const URL = '/p/crp/publish/all';
    return Axios.get(URL).then(resp => resp.data);
}

function* getPublishHistoryRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
      const response =  yield call(getPublishHistoryRequest);
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

const getPublishHistoryItemByIdRequest = (publishedId) => {
  const URL = '/p/crp/publish/id/'+publishedId;
  return Axios.get(URL).then(resp => resp.data);
}

function* getPublishHistoryItemByIdRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    const response = yield call(getPublishHistoryItemByIdRequest, action.payload.apiPayloadRequest.id);

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

export default function* PublishHistoryWatcherSaga() {
  yield takeLatest(ACTION_GET_PUBLISH_HISTORY_REQUEST, getPublishHistoryRequestSaga);
  yield takeLatest(ACTION_GET_PUBLISH_HISTORY_ITEM_BY_ID_REQUEST, getPublishHistoryItemByIdRequestSaga);
}
