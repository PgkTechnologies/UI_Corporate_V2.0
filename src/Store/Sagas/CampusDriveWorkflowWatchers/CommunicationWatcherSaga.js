import { call, takeLatest, put } from "redux-saga/effects";
import Axios from "../../../utils/Axios";
import { toast } from "react-toastify";
import {
  ACTION_GET_CAMPUS_DRIVE_EMAIL_TEMPLATES_LIST_REQUEST,
  ACTION_POST_CAMPUS_DRIVE_NEW_EMAIL_TEMPLATE_REQUEST,
  ACTION_GET_CAMPUS_DRIVE_INDUCTION_INFO_REQUEST,
  ACTION_POST_CAMPUS_DRIVE_INTERVIEW_ROUNDS_REQUEST,
  ACTION_PATCH_CAMPUS_DRIVE_INTERVIEW_ROUNDS_REQUEST,
  ACTION_GET_CAMPUS_DRIVE_EMAIL_TEMPLATE_DETAILS_REQUEST,
  ACTION_PATCH_CAMPUS_DRIVE_EMAIL_TEMPLATE_INFO_REQUEST,
  ACTION_DELETE_CAMPUS_DRIVE_EMAIL_TEMPLATE_INFO_REQUEST,
  ACTION_POST_CAMPUS_DRIVE_INDUCTION_INFO_REQUEST,
  ACTION_PATCH_CAMPUS_DRIVE_INDUCTION_INFO_REQUEST,
  ACTION_DELETE_CAMPUS_DRIVE_INDUCTION_INFO_REQUEST,
  ACTION_SHARE_CAMPUS_DRIVE_INTERVIEW_ROUNDS_REQUEST,
} from "../../Actions/SagaActions/SagaActionTypes";
import { actionUpdateGlobalLoaderSagaAction } from "../../Actions/SagaActions/CommonSagaActions";

// GET EMAIL TEMPLATES LIST - CAMPUS DRIVE
const getEmailTemplatesListRequest = (model) => {
  const URL = "/icom/et/all?cdID=" + model.campusDriveID;
  return Axios.get(URL, model).then((resp) => resp.data);
};

function* getEmailTemplatesListRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));
  try {
    const model = action.payload.apiPayloadRequest;
    const data = yield call(getEmailTemplatesListRequest, model);
    action.payload.callback(data);
  } catch (err) {
    if (err.response) {
      toast.error(
        err?.response?.data?.errors?.length &&
          err?.response?.data?.errors[0]?.message
      );
    } else {
      //toast.error("Something Wrong!", err.message);
    }
  } finally {
    yield put(actionUpdateGlobalLoaderSagaAction(false));
  }
}

const patchEmailTemplateInfo = (payload) => {
  const URL = "/icom/et";
  return Axios.patch(URL, payload).then((res) => res.data);
};

function* patchEmailTemplateInfoSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));
  try {
    const model = action.payload.apiPayloadRequest;
    const resp = yield call(patchEmailTemplateInfo, model);
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

// GET EMAIL TEMPLATE INFO - CAMPUS DRIVE
const getEmailTemplateInfoRequest = (model) => {
  const URL =
    "/icom/et/byID?cdID=" +
    model.campusDriveId +
    "&emailTemplateID=" +
    model.emailTemplateId;
  return Axios.get(URL, model).then((resp) => resp.data);
};

function* getEmailTemplatesInfoRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));
  try {
    const model = action.payload.apiPayloadRequest;
    const data = yield call(getEmailTemplateInfoRequest, model);
    action.payload.callback(data);
  } catch (err) {
    if (err.response) {
      toast.error(
        err?.response?.data?.errors?.length &&
          err?.response?.data?.errors[0]?.message
      );
    } else {
      //toast.error("Something Wrong!", err.message);
    }
  } finally {
    yield put(actionUpdateGlobalLoaderSagaAction(false));
  }
}

// GET EMAIL TEMPLATE INFO - CAMPUS DRIVE
const deleteEmailTemplateInfoRequest = (model) => {
  const URL =
    "/icom/et?cdID=" +
    model.campusDriveId +
    "&emailTemplateID=" +
    model.emailTemplateId;
  return Axios.delete(URL, model).then((resp) => resp.data);
};

function* deleteEmailTemplatesInfoRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));
  try {
    const model = action.payload.apiPayloadRequest;
    const data = yield call(deleteEmailTemplateInfoRequest, model);
    action.payload.callback(data);
  } catch (err) {
    if (err.response) {
      toast.error(
        err?.response?.data?.errors?.length &&
          err?.response?.data?.errors[0]?.message
      );
    } else {
      //toast.error("Something Wrong!", err.message);
    }
  } finally {
    yield put(actionUpdateGlobalLoaderSagaAction(false));
  }
}

// DELETE INDUCTION INFO - CAMPUS DRIVE
const deleteInductionInfoRequest = (model) => {
  const URL =
    "/icom/induction?cdID=" +
    model.campusDriveID +
    "&inductionID=" +
    model.inductionID;
  return Axios.delete(URL, model).then((resp) => resp.data);
};

function* deleteInductionInfoRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));
  try {
    const model = action.payload.apiPayloadRequest;
    const data = yield call(deleteInductionInfoRequest, model);
    action.payload.callback(data);
  } catch (err) {
    if (err.response) {
      toast.error(
        err?.response?.data?.errors?.length &&
          err?.response?.data?.errors[0]?.message
      );
    } else {
      //toast.error("Something Wrong!", err.message);
    }
  } finally {
    yield put(actionUpdateGlobalLoaderSagaAction(false));
  }
}

// POST INDUCTION INFO - CAMPUS DRIVE
const postInductionInfoRequest = (model) => {
  const URL = "/icom/induction";
  return Axios.post(URL, model).then((resp) => resp.data);
};

function* postInductionInfoRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));
  try {
    const model = action.payload.apiPayloadRequest;
    const data = yield call(postInductionInfoRequest, model);
    action.payload.callback(data);
  } catch (err) {
    if (err.response) {
      toast.error(
        err?.response?.data?.errors?.length &&
          err?.response?.data?.errors[0]?.message
      );
    } else {
      //toast.error("Something Wrong!", err.message);
    }
  } finally {
    yield put(actionUpdateGlobalLoaderSagaAction(false));
  }
}

// PATCH INDUCTION INFO - CAMPUS DRIVE
const patchInductionInfoRequest = (model) => {
  const URL = "/icom/induction";
  return Axios.patch(URL, model).then((resp) => resp.data);
};

function* patchInductionInfoRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));
  try {
    const model = action.payload.apiPayloadRequest;
    const data = yield call(patchInductionInfoRequest, model);
    action.payload.callback(data);
  } catch (err) {
    if (err.response) {
      toast.error(
        err?.response?.data?.errors?.length &&
          err?.response?.data?.errors[0]?.message
      );
    } else {
      //toast.error("Something Wrong!", err.message);
    }
  } finally {
    yield put(actionUpdateGlobalLoaderSagaAction(false));
  }
}

// GET INDUCTION INFO - CAMPUS DRIVE
const getInductionInfoRequest = (model) => {
  const URL = "/icom/induction?cdID=" + model.campusDriveID;
  return Axios.get(URL).then((resp) => resp.data);
};

function* getInductionInfoRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));
  try {
    const model = action.payload.apiPayloadRequest;
    const data = yield call(getInductionInfoRequest, model);
    action.payload.callback(data);
  } catch (err) {
    if (err.response) {
      toast.error(
        err?.response?.data?.errors?.length &&
          err?.response?.data?.errors[0]?.message
      );
    } else {
      //toast.error("Something Wrong!", err.message);
    }
  } finally {
    yield put(actionUpdateGlobalLoaderSagaAction(false));
  }
}

const createEmailTemplate = (payload) => {
  const URL = "/icom/et";
  return Axios.post(URL, payload).then((res) => res.data);
};

function* createEmailTemplateSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));
  try {
    const model = action.payload.apiPayloadRequest;
    const resp = yield call(createEmailTemplate, model);
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

const addInterViewRounds = (payload) => {
  const URL = "/ci/ir/";
  return Axios.post(URL, payload).then((res) => res.data);
};

function* addInterViewRoundsSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));
  try {
    const model = action.payload.apiPayloadRequest;
    let formData = new FormData();
    for (const key in model) {
      formData.append(key, model[key]);
    }
    const resp = yield call(addInterViewRounds, formData);
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

const shareInterViewRounds = (payload) => {
  const URL = "/ci/ir/shareRounds";
  return Axios.post(URL, payload).then((res) => res.data);
};

function* shareInterViewRoundsSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));
  try {
    const model = action.payload.apiPayloadRequest;
    console.log(model);
    // let formData = new FormData();
    // for (const key in model) {
    //     formData.append(key, model[key]);
    // }
    const resp = yield call(shareInterViewRounds, model);
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

const updateInterViewRounds = (payload) => {
  const URL = "/ci/ir/";
  return Axios.patch(URL, payload).then((res) => res.data);
};

function* updateInterViewRoundsSaga(action) {
  try {
    const model = action.payload.apiPayloadRequest;
    let formData = new FormData();
    for (const key in model) {
      formData.append(key, model[key]);
    }
    const resp = yield call(updateInterViewRounds, formData);
    action.payload.callback(resp);
  } catch (err) {
    if (err?.response) {
      toast.error(err?.response?.data?.errors[0]?.message);
    } else {
      //toast.error("Something Wrong!", err?.message);
    }
  }
}

export default function* CommunicationWatcherSaga() {
  yield takeLatest(
    ACTION_GET_CAMPUS_DRIVE_EMAIL_TEMPLATES_LIST_REQUEST,
    getEmailTemplatesListRequestSaga
  );
  yield takeLatest(
    ACTION_POST_CAMPUS_DRIVE_NEW_EMAIL_TEMPLATE_REQUEST,
    createEmailTemplateSaga
  );
  yield takeLatest(
    ACTION_GET_CAMPUS_DRIVE_INDUCTION_INFO_REQUEST,
    getInductionInfoRequestSaga
  );
  yield takeLatest(
    ACTION_POST_CAMPUS_DRIVE_INDUCTION_INFO_REQUEST,
    postInductionInfoRequestSaga
  );
  yield takeLatest(
    ACTION_PATCH_CAMPUS_DRIVE_INDUCTION_INFO_REQUEST,
    patchInductionInfoRequestSaga
  );
  yield takeLatest(
    ACTION_POST_CAMPUS_DRIVE_INTERVIEW_ROUNDS_REQUEST,
    addInterViewRoundsSaga
  );
  yield takeLatest(
    ACTION_PATCH_CAMPUS_DRIVE_INTERVIEW_ROUNDS_REQUEST,
    updateInterViewRoundsSaga
  );
  yield takeLatest(
    ACTION_SHARE_CAMPUS_DRIVE_INTERVIEW_ROUNDS_REQUEST,
    shareInterViewRoundsSaga
  );
  yield takeLatest(
    ACTION_GET_CAMPUS_DRIVE_EMAIL_TEMPLATE_DETAILS_REQUEST,
    getEmailTemplatesInfoRequestSaga
  );
  yield takeLatest(
    ACTION_PATCH_CAMPUS_DRIVE_EMAIL_TEMPLATE_INFO_REQUEST,
    patchEmailTemplateInfoSaga
  );
  yield takeLatest(
    ACTION_DELETE_CAMPUS_DRIVE_EMAIL_TEMPLATE_INFO_REQUEST,
    deleteEmailTemplatesInfoRequestSaga
  );
  yield takeLatest(
    ACTION_DELETE_CAMPUS_DRIVE_INDUCTION_INFO_REQUEST,
    deleteInductionInfoRequestSaga
  );
}
