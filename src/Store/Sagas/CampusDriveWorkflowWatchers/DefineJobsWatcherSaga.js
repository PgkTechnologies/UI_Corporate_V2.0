import { call, takeLatest, put } from "redux-saga/effects";
import Axios from "../../../utils/Axios";
import { toast } from "react-toastify";
import {
  ACTION_GET_CAMPUS_DRIVE_DEFINE_JOBS_LIST_REQUEST,
  ACTION_GET_CAMPUS_DRIVE_HIRING_CRITERIA_LIST_REQUEST,
  ACTION_POST_OR_PATCH_CAMPUS_DRIVE_HIRING_CRITERIA_REQUEST,
  ACTION_POST_OR_PATCH_CAMPUS_DRIVE_JOB_REQUEST,
  ACTION_DELETE_CAMPUS_DRIVE_JOB_REQUEST,
  ACTION_PUBLISH_CAMPUS_DRIVE_PUBLISH_JOBS_REQUEST,
  ACTION_GET_CAMPUS_DRIVE_STUDENTS_LIST_BY_JOB_ID_REQUEST,
  ACTION_GET_CAMPUS_DRIVE_APP_WINDOW_JOB_BY_ID_REQUEST,
  ACTION_POST_CAMPUS_DRIVE_APP_WINDOW_JOB_REQUEST,
  ACTION_GET_CAMPUS_DRIVE_DATES_FINALIZATION_REQUEST,
  ACTION_SAVE_OR_EDIT_CAMPUS_DRIVE_DATES_FINALIZATION_REQUEST,
  ACTION_PUT_CAMPUS_DRIVE_EXCEPTION_STUDENT_LIST_REQUEST,
  ACTION_POST_OR_PATCH_OFF_CAMPUS_DRIVE_HIRING_CRITERIA_REQUEST,
  ACTION_POST_OR_PATCH_OFF_CAMPUS_DRIVE_JOB_REQUEST,
  ACTION_ADD_JODATATO_OFF_CAMPUS_DRIVE_REQUEST,
} from "../../Actions/SagaActions/SagaActionTypes";
import { actionUpdateGlobalLoaderSagaAction } from "../../Actions/SagaActions/CommonSagaActions";

// GET DEFINE JOBS - CAMPUS DRIVE // this is changed on 270423
const getDefineJobsListRequest = (campusDriveId) => {
  //console.log(campusDriveId, 'Call ID')
  const offCamp = campusDriveId.slice(0, 2);
  let URL = `/cdj/job/all/${campusDriveId}`
  // if (offCamp === "CF") {
  //   URL = "/p/crp/createJob/all";
  // } else {
  //   URL = "/cdj/job/all/" + campusDriveId;
  // }
  return Axios.get(URL).then((resp) => resp.data);
};

function* getDefineJobsListRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    const data = yield call(
      getDefineJobsListRequest,
      action.payload.campusDriveId
    );
    if (action.payload.callback) {
      action.payload.callback(data);
      //console.log(JSON.stringify(data))
    }
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

// GET CAMPUS DRIVE HIRING CRITERIA LIST - CAMPUS DRIVE
const getCampusDriveHiringCriteriaListRequest = (apiPayloadRequest) => {
  const URL = "/cdj/hc/all/" + apiPayloadRequest.campusDriveId;
  return Axios.get(URL).then((resp) => resp.data);
};

function* getCampusDriveHiringCriteriaListRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    const data = yield call(
      getCampusDriveHiringCriteriaListRequest,
      action.payload.apiPayloadRequest
    );
    if (action.payload.callback && data) {
      action.payload.callback(data);
    }
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

// POST OR PATCH HIRING CRITERIA - CAMPUS DRIVE
const postOrPatchCampusDriveHiringCriteriaRequest = (apiPayloadRequest) => {
  if (apiPayloadRequest?.hiringCriteriaID) {
    const URL = "/cdj/hc";
    return Axios.patch(URL, apiPayloadRequest).then((resp) => resp.data);
  } else {
    const URL = "/cdj/hc";
    return Axios.post(URL, apiPayloadRequest).then((resp) => resp.data);
  }
};

function* postOrPatchCampusDriveHiringCriteriaRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    const data = yield call(
      postOrPatchCampusDriveHiringCriteriaRequest,
      action.payload.apiPayloadRequest
    );
    if (action.payload.callback) {
      action.payload.callback(data);
    }
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

const postOrPatchOffCampusDriveHiringCriteriaRequest = (apiPayloadRequest) => {
  console.log(apiPayloadRequest, "HCCCCCCCCC");
  if (apiPayloadRequest?.hiringCriteriaID) {
    const URL = "/p/crp/hiringCriteria/";
    return Axios.patch(URL, apiPayloadRequest).then((resp) => resp.data);
  } else {
    const URL = "/p/crp/hiringCriteria/";
    return Axios.post(URL, apiPayloadRequest).then((resp) => resp.data);
  }
};

function* postOrPatchOffCampusDriveHiringCriteriaRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    const data = yield call(
      postOrPatchOffCampusDriveHiringCriteriaRequest,
      action.payload.apiPayloadRequest
    );
    if (action.payload.callback) {
      action.payload.callback(data);
    }
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

// POST OR PATCH JOB - CAMPUS DRIVE
const postOrPatchCampusDriveJobRequest = (apiPayloadRequest) => {
  if (apiPayloadRequest?.jobID) {
    const URL = "/cdj/job";
    return Axios.patch(URL, apiPayloadRequest).then((resp) => resp.data);
  } else {
    const URL = "/cdj/job";
    return Axios.post(URL, apiPayloadRequest).then((resp) => resp.data);
  }
};

function* postOrPatchCampusDriveJobRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    const data = yield call(
      postOrPatchCampusDriveJobRequest,
      action.payload.apiPayloadRequest
    );
    if (action.payload.callback) {
      action.payload.callback(data);
    }
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

const postOrPatchOffCampusDriveJobRequest = (apiPayloadRequest) => {
  console.log(apiPayloadRequest, "PAYLOAD");
  if (apiPayloadRequest?.jobID) {
    const URL = `/p/crp/createJob/`;
    return Axios.patch(URL, apiPayloadRequest).then((resp) => resp.data);
  } else {
    const URL = `/p/crp/createJob/`;
    return Axios.post(URL, apiPayloadRequest).then((resp) => resp.data);
  }
};

function* postOrPatchOffCampusDriveJobRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));
  try {
    const data = yield call(
      postOrPatchOffCampusDriveJobRequest,
      action.payload.apiPayloadRequest
    );
    if (action.payload.callback) {
      action.payload.callback(data);
    }
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

const assignJobDatatoCampusDriveAPI = (apiPayloadRequest) => {
  const URL = "/cdj/offCampus/addJobs";
  return Axios.post(URL, apiPayloadRequest).then((resp) => resp.data);
};

function* addJobdatatoOffCampusDriveSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));
  try {
    const data = yield call(
      assignJobDatatoCampusDriveAPI,
      action.payload.apiPayloadRequest
    );
    if (action.payload.callback) {
      action.payload.callback(data);
    }
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

// DELETE JOB - CAMPUS DRIVE
const deleteCampusDriveJobRequest = (apiPayloadRequest) => {
  const URL = "/cdj/job/" + apiPayloadRequest.jobID;
  return Axios.delete(URL).then((resp) => resp.data);
};
function* deleteCampusDriveJobRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    const data = yield call(
      deleteCampusDriveJobRequest,
      action.payload.apiPayloadRequest
    );
    if (action.payload.callback) {
      action.payload.callback(data);
    }
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

// PUBLISH JOBS - CAMPUS DRIVE
const publishCampusDriveJobsRequest = (apiPayloadRequest) => {
  const URL = "/cdj/job/publish";
  return Axios.post(URL, apiPayloadRequest).then((resp) => resp.data);
};

function* publishCampusDriveJobsRequestSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    const data = yield call(
      publishCampusDriveJobsRequest,
      action.payload.apiPayloadRequest
    );
    if (action.payload.callback) {
      action.payload.callback(data);
    }
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

// Old Publish
const publishCampusDriveJobsRequestOld = (apiPayloadRequest) => {
  const URL = "/cdj/job/publish";
  return Axios.post(URL, apiPayloadRequest).then((resp) => resp.data);
};

function* publishCampusDriveJobsRequestSagaOld(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    const data = yield call(
      publishCampusDriveJobsRequestOld,
      action.payload.apiPayloadRequest
    );
    if (action.payload.callback) {
      action.payload.callback(data);
    }
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

// GET STUDENTS LIST BY JOB ID - CAMPUS DRIVE
const getCampusDriveStudentsListByJobId = (apiPayloadRequest) => {
  const URL =
    "/cdj/sl/list/" +
    apiPayloadRequest.jobID +
    "/" +
    apiPayloadRequest.campusDriveId;
  return Axios.get(URL).then((resp) => resp.data);
};

const getCampusDriveExceptionStudentsListByJobId = (apiPayloadRequest) => {
  const URL =
    "/cdj/el/cexlst/" +
    apiPayloadRequest.jobID +
    "/" +
    apiPayloadRequest.campusDriveId;
  return Axios.get(URL).then((resp) => resp.data);
};

function* getCampusDriveStudentsListByJobIdRequest(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));
  try {
    let applicantList = yield call(
      getCampusDriveStudentsListByJobId,
      action.payload.apiPayloadRequest
    );
    let exceptionList = yield call(
      getCampusDriveExceptionStudentsListByJobId,
      action.payload.apiPayloadRequest
    );

    applicantList = applicantList?.length ? applicantList : [];
    exceptionList = exceptionList?.length ? exceptionList : [];

    if (action.payload.callback) {
      action.payload.callback({
        applicantList: applicantList,
        exceptionList: exceptionList,
      });
    } else if (action?.payload?.callback) {
      action.payload.callback([]);
    }
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

// GET APPLICATION WINDOW JOBS LIST - CAMPUS DRIVE
const getCampusDriveAppWindowJobById = (apiPayloadRequest) => {
  const URL =
    "/cdj/jaw/job/" +
    apiPayloadRequest?.jobID +
    "/" +
    apiPayloadRequest?.campusDriveID;
  return Axios.get(URL).then((resp) => resp.data);
};

function* getCampusDriveAppWindowJobByIdRequest(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    const data = yield call(
      getCampusDriveAppWindowJobById,
      action?.payload?.apiPayloadRequest
    );
    //console.log(data);
    if (action.payload.callback) {
      action.payload.callback(data);
    }
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

// POST APPLICATION WINDOW JOB - CAMPUS DRIVE
const patchCampusDriveAppWindowJob = (formData) => {
  const URL = "/cdj/jaw";
  return Axios.patch(URL, formData).then((resp) => resp.data);
};

const postCampusDriveAppWindowJob = (formData) => {
  const URL = "/cdj/jaw";
  return Axios.post(URL, formData).then((resp) => resp.data);
};

function* postCampusDriveAppWindowJobRequest(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    let formData = new FormData();

    if (action?.payload?.apiPayloadRequest?.data?.update) {
      delete action?.payload?.apiPayloadRequest?.data?.update;

      for (const key in action?.payload?.apiPayloadRequest?.data) {
        formData.append(key, action?.payload?.apiPayloadRequest?.data[key]);
      }

      const data = yield call(patchCampusDriveAppWindowJob, formData);
      if (action.payload.callback) {
        action.payload.callback(data);
      }
    } else {
      for (const key in action?.payload?.apiPayloadRequest?.data) {
        formData.append(key, action?.payload?.apiPayloadRequest?.data[key]);
      }

      const data = yield call(postCampusDriveAppWindowJob, formData);
      if (action.payload.callback) {
        action.payload.callback(data);
      }
    }
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

const getCampusDriveDatesFinalizationRequest = (payloadRequest) => {
  const URL = "/cdj/fd/stuListexists/" + payloadRequest.campusDriveId;
  return Axios.get(URL).then((resp) => resp.data);
};

function* getCampusDriveDatesFinalizationRequestSaga(action) {
  try {
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    const data = yield call(
      getCampusDriveDatesFinalizationRequest,
      action.payload.apiPayloadRequest
    );
    if (action.payload.callback) {
      action.payload.callback(data);
    }
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

const saveOrEditCampusDriveDatesFinalizationRequest = (formData) => {
  const URL = "/cdj/fd/finalDates";
  return Axios.post(URL, formData).then((resp) => resp.data);
};

function* saveOrEditCampusDriveDatesFinalizationRequestSaga(action) {
  try {
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    let formData = new FormData();

    //console.log(action?.payload?.apiPayloadRequest);
    for (const key in action?.payload?.apiPayloadRequest) {
      formData.append(key, action?.payload?.apiPayloadRequest[key]);
    }

    const data = yield call(
      saveOrEditCampusDriveDatesFinalizationRequest,
      formData
    );
    if (action.payload.callback) {
      action.payload.callback(data);
    }
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

// PUT CAMPUS DRIVE EXCEPTION STDUENT LIST REQUEST
const putCampusDriveExceptionStudentList = (formData) => {
  const URL = "/cdj/el/corp";
  return Axios.put(URL, formData).then((resp) => resp.data);
};

function* putCampusDriveExceptionStudentListRequest(action) {
  try {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    const data = yield call(
      putCampusDriveExceptionStudentList,
      action?.payload?.apiPayloadRequest
    );
    if (action.payload.callback) {
      action.payload.callback(data);
    }
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

export default function* DefineJobsWatcherSaga() {
  yield takeLatest(
    ACTION_GET_CAMPUS_DRIVE_DEFINE_JOBS_LIST_REQUEST,
    getDefineJobsListRequestSaga
  );
  yield takeLatest(
    ACTION_GET_CAMPUS_DRIVE_HIRING_CRITERIA_LIST_REQUEST,
    getCampusDriveHiringCriteriaListRequestSaga
  );
  yield takeLatest(
    ACTION_POST_OR_PATCH_CAMPUS_DRIVE_HIRING_CRITERIA_REQUEST,
    postOrPatchCampusDriveHiringCriteriaRequestSaga
  );
  yield takeLatest(
    ACTION_POST_OR_PATCH_OFF_CAMPUS_DRIVE_HIRING_CRITERIA_REQUEST,
    postOrPatchOffCampusDriveHiringCriteriaRequestSaga
  );

  yield takeLatest(
    ACTION_POST_OR_PATCH_CAMPUS_DRIVE_JOB_REQUEST,
    postOrPatchCampusDriveJobRequestSaga
  );

  yield takeLatest(
    ACTION_POST_OR_PATCH_OFF_CAMPUS_DRIVE_JOB_REQUEST,
    postOrPatchOffCampusDriveJobRequestSaga
  );

  yield takeLatest(
    ACTION_ADD_JODATATO_OFF_CAMPUS_DRIVE_REQUEST,
    addJobdatatoOffCampusDriveSaga
  );

  yield takeLatest(
    ACTION_DELETE_CAMPUS_DRIVE_JOB_REQUEST,
    deleteCampusDriveJobRequestSaga
  );
  yield takeLatest(
    ACTION_PUBLISH_CAMPUS_DRIVE_PUBLISH_JOBS_REQUEST,
    publishCampusDriveJobsRequestSaga
  );

  
  yield takeLatest(
    ACTION_GET_CAMPUS_DRIVE_STUDENTS_LIST_BY_JOB_ID_REQUEST,
    getCampusDriveStudentsListByJobIdRequest
  );
  yield takeLatest(
    ACTION_GET_CAMPUS_DRIVE_APP_WINDOW_JOB_BY_ID_REQUEST,
    getCampusDriveAppWindowJobByIdRequest
  );
  yield takeLatest(
    ACTION_POST_CAMPUS_DRIVE_APP_WINDOW_JOB_REQUEST,
    postCampusDriveAppWindowJobRequest
  );
  yield takeLatest(
    ACTION_GET_CAMPUS_DRIVE_DATES_FINALIZATION_REQUEST,
    getCampusDriveDatesFinalizationRequestSaga
  );
  yield takeLatest(
    ACTION_SAVE_OR_EDIT_CAMPUS_DRIVE_DATES_FINALIZATION_REQUEST,
    saveOrEditCampusDriveDatesFinalizationRequestSaga
  );
  yield takeLatest(
    ACTION_PUT_CAMPUS_DRIVE_EXCEPTION_STUDENT_LIST_REQUEST,
    putCampusDriveExceptionStudentListRequest
  );
}
