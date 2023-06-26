// import packages
import { put, call, takeLatest } from "redux-saga/effects";
import Axios from "../../utils/Axios";
import { toast } from "react-toastify";
import { ACTION_GET_CORPORATE_PROFILE_REQUEST, ACTION_PATCH_CORPORATE_PROFILE_REQUEST, ACTION_POST_PUBLISH_CORPORATE_PROFILE_REQUEST, ACTION_PAYMENT_CORPORATE_EMAIL_REQUEST, ACTION_POST_UNIVERSITY_INVOICE_REQUEST } from '../Actions/SagaActions/SagaActionTypes';
import { actionUpdateGlobalLoaderSagaAction } from '../Actions/SagaActions/CommonSagaActions';
import { actionGetCorporateProfileResponse, actionGetCorporateProfileSagaAction } from '../Actions/SagaActions/CorporateProfileSagaActions'

 

const getCorporateProfileRequest = () => {
  const URL = "/u/profile/";
  return Axios.get(URL).then((res) => {
    return res.data;
  });
};

function* getCorporateProfileRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    const response = yield call(getCorporateProfileRequest);
    yield put(actionGetCorporateProfileResponse(response));

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

//
function patchCorporateProfileRequest(formData) {
  const URL = "/u/profile/";
  return Axios.patch(URL, formData).then((res) => {
    return res.data;
  });
}

function* patchCorporateProfileRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    let formData = new FormData();
    for (const key in action.payload.apiPayloadRequest) {
      formData.append(key, action.payload.apiPayloadRequest[key]);
    }
    const response = yield call(patchCorporateProfileRequest, formData);
    yield put(actionGetCorporateProfileSagaAction());

    action?.payload?.callback && action.payload.callback(response);

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

const postPublishCorporateProfileRequest = (formData) => {
  const URL = "/p/crp/publish/profile";
  return Axios.post(URL, formData).then((res) => {
    return res.data;
  });
}

function* postPublishCorporateProfileRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {

    let formData = new FormData();
    formData.append('publishData', JSON.stringify(action.payload.apiPayloadRequest));

    const response = yield call(postPublishCorporateProfileRequest, formData);
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

const getPaymentEmailDetails = (action) => {
  const URL = "/pg/getEmailData";
  return Axios.post(URL, action)
    .then((res) => {
      return res.data;
    });
}

function* getPaymentEmailDetailsRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));
  try {
    const response = yield call(
      getPaymentEmailDetails,
      action.payload.apiPayloadRequest   //new 
    );
    if (action?.payload?.callback) {
      action.payload.callback(response);
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

function postInvoiceUniversityRequest(formData) {
  const URL = "/pg/sendInvoice";
  return Axios.post(URL, formData, { contentType: "application/json" }).then((res) => {
    return res.data;
  });
}


function* postUniversityInvoiceRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));
  //yield put(APIStatus(true));
  try {
    // let formData = new FormData();
    // for (const key in action.payload.apiPayloadRequest) {
    //   formData.append(key, action.payload.apiPayloadRequest[key]);
    // }                                                   //replacing formDAta in yield ->action.p.api
    const response = yield call(postInvoiceUniversityRequest, action.payload.apiPayloadRequest);
    action.payload.callback(response);
  } catch (err) {
    if (err.response) {
      toast.error(err.response.data.errors[0].message);
    } else {
      //toast.error("Something Wrong!", err.message);
    }
  } finally {
    //yield put(APIStatus(true));
    yield put(actionUpdateGlobalLoaderSagaAction(false));
  }
}

export default function* CorporateProfileWatcherSaga() {
  yield takeLatest(ACTION_GET_CORPORATE_PROFILE_REQUEST, getCorporateProfileRequestSaga);
  yield takeLatest(ACTION_PATCH_CORPORATE_PROFILE_REQUEST, patchCorporateProfileRequestSaga);
  yield takeLatest(ACTION_POST_PUBLISH_CORPORATE_PROFILE_REQUEST, postPublishCorporateProfileRequestSaga);
  yield takeLatest(ACTION_PAYMENT_CORPORATE_EMAIL_REQUEST, getPaymentEmailDetailsRequestSaga);
  yield takeLatest(
    ACTION_POST_UNIVERSITY_INVOICE_REQUEST,
    postUniversityInvoiceRequestSaga
  );
}
