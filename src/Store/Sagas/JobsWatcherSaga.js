import { call, takeLatest, put } from "redux-saga/effects";
import Axios from "../../utils/Axios";
import { toast } from "react-toastify";
import {
  ACTION_GET_CORPORATE_JOBS_BYID_REQUEST,
  ACTION_GET_CORPORATE_JOBS_REQUEST,
  ACTION_POST_CORPORATE_JOBS_REQUEST,
  ACTION_POST_CORPORATE_UPDATEJOBS_REQUEST,
  ACTION_POST_PUBLISH_CORPORATE_JOBS_REQUEST,
  ACTION_DELETE_CORPORATE_JOB_BYID_REQUEST,
  ACTION_POST_CORPORATE_JOBS_NEW,
  ACTION_GET_CORPORATE_JOBS_CAMPUSDRIVE_REQUEST,
  ACTION_PATCH_CAMPUSDRIVE_UPDATEJOBS_REQUEST,
} from "../Actions/SagaActions/SagaActionTypes";
import { actionUpdateGlobalLoaderSagaAction } from "../Actions/SagaActions/CommonSagaActions";

const getJobs = () => {
  const URL = "/p/crp/createJob/all";
  return Axios.get(URL).then((res) => res.data);
};

function* getJobsSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    const resp = yield call(getJobs);
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

const getJobById = (id) => {
  //const URL = "/p/crp/createJob/getByID/" + id;
  const URL = "/p/crp/createJob/getByID/" + id;
  return Axios.get(URL).then((res) => res.data);
};

function* getJobByIdSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    const resp = yield call(getJobById, action.payload.apiPayloadRequest);
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

const getJobByCampusdriveId = (payload) => {
  const cdID = payload.cdID;
  const jobID = payload.jobID;
  //const URL = "/p/crp/createJob/getByID/" + id;
  const URL = `/cdj/job/id/${cdID}/${jobID}`;

  return Axios.get(URL).then((res) => res.data);
};

function* getJobCampusdriveByIdSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    const resp = yield call(
      getJobByCampusdriveId,
      action.payload.apiPayloadRequest
    );
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

const addJobs = (payload) => {
  const URL = "/p/crp/hiringCriteria/";
  // return Axios.post(URL, { hiringCriterias: [payload] }).then(
  //   (res) => res.data
  // ); // OLD API
  return Axios.post(URL, { hiringCriterias: [payload] }).then(
    (res) => res.data
  );
};

function* addJobsSaga(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    const model = action.payload.apiPayloadRequest;
    const resp = yield call(addJobs, model);
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

//Edit Job for offcampus and Job create

const editJobs = (jobID, hcID, payload) => {
  //const URL = `/p/crp/createJob/job/${id}`;
  const URL = `p/crp/createJobHc/${jobID}/${hcID}`;
  //const URL = `p/cdj/job/jobHc/${jobID}/${hcID}`;
  const header = {
    headers: {
      // 'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return Axios.patch(URL, payload, header).then((res) => {
   
    return res.data;
  });
};

//Edit Job for offcampus and Job create

function* editJobsSaga(action) {
  try {
    const { req, jobID, hcID } = action.payload.apiPayloadRequest;
    const resp = yield call(editJobs, jobID, hcID, req);
    toast.success(resp.message);
    action.payload.callback(resp);
  } catch (err) {
    if (err?.response) {
      toast.error(err?.response?.data?.errors[0]?.message);
    } else {
      //toast.error("Something Wrong!", err?.message);
    }
  }
}

//CampusDrive Patch
const editCampusDriveJobs = (jobID, hcID, payload) => {
  
  //const URL = `p/crp/createJobHc/${jobID}/${hcID}`;
  const URL = `cdj/job/jobHc`;
  const header = {
    headers: {
      // 'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return Axios.patch(URL, payload, header).then((headers) => {
    return headers;
  });
};

function* editCampusDriveJobsSaga(action) {
  try {
    const { req, jobID, hcID } = action.payload.apiPayloadRequest;
    const resp = yield call(editCampusDriveJobs, jobID, hcID, req);
    
    if (resp.status === 200) {
      toast.success("Successfully Updated");
    } else {
      toast.success("Something went wrong");
    }
    action.payload.callback(resp);
  } catch (err) {
    if (err?.response) {
      toast.error(err?.response?.data?.errors[0]?.message);
    } else {
      //toast.error("Something Wrong!", err?.message);
    }
  }
}

const postJobs = (payload) => {
  const URL = "/p/crp/createJob/";
  const header = {
    headers: {
      // 'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return Axios.post(URL, payload, header).then((res) => res.data);
};

function* postJobsSaga(action) {
  try {
    const req = action.payload.apiPayloadRequest;
   
    // let formData = new FormData();
    // for (const key in model) {
    //     formData.append(key, model[key]);
    // }
    const resp = yield call(postJobs, req[0]);
    toast.success(resp.message);
    action.payload.callback(resp);
    
  } catch (err) {
    if (err?.response) {
      toast.error(err?.response?.data?.errors[0]?.message);
    } else {
      //toast.error("Something Wrong!", err?.message);
    }
  }
}

const postPublishCorporateJobs = (formData) => {
  const offCampus = formData.cdID.slice(0, 2);

  let data;
  let URL = "";
  if (offCampus === "CF") {
    data = { publishJobs: [{ jobID: formData.jobIds[0] }] };
   
    URL = "/p/crp/publishJob/jobHc";
  } else {
    URL = "/cdj/job/publish";
    data = formData;
  }
  //const URL = "/p/crp/publishJob/";
  //const URL = "p/crp/publishJob/jobHc";
  return Axios.post(URL, data).then((resp) => resp.data);
};

function* postPublishCorporateJobsRequest(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    yield call(postPublishCorporateJobs, action.payload.apiPayloadRequest);
    action.payload.callback();
  } catch (err) {
    if (err.response) {
      toast.error(
        err?.response?.data?.errors?.length &&
          err?.response?.data?.errors[0]?.message
      );
    } else {
      toast.error("Something Wrong!", err.message);
    }
  } finally {
    yield put(actionUpdateGlobalLoaderSagaAction(false));
  }
}

const deleteJobById = (id) => {
  const URL = "/p/crp/createJob/job/" + id;
  return Axios.delete(URL).then((resp) => resp.data);
};

function* deleteJobByIdRequest(action) {
  yield put(actionUpdateGlobalLoaderSagaAction(true));

  try {
    if (action.payload.apiPayloadRequest.jobID) {
      const response = yield call(
        deleteJobById,
        action.payload.apiPayloadRequest.jobID
      );
      action.payload.callback(response);
      toast.success("Deleted Successfully!");
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

export default function* JobsWatcherSaga() {
  yield takeLatest(ACTION_GET_CORPORATE_JOBS_REQUEST, getJobsSaga);
  yield takeLatest(ACTION_GET_CORPORATE_JOBS_BYID_REQUEST, getJobByIdSaga);
  yield takeLatest(
    ACTION_GET_CORPORATE_JOBS_CAMPUSDRIVE_REQUEST,
    getJobCampusdriveByIdSaga
  );
  yield takeLatest(ACTION_POST_CORPORATE_JOBS_REQUEST, addJobsSaga);
  yield takeLatest(ACTION_POST_CORPORATE_JOBS_NEW, postJobsSaga);
  yield takeLatest(ACTION_POST_CORPORATE_UPDATEJOBS_REQUEST, editJobsSaga);
  yield takeLatest(
    ACTION_PATCH_CAMPUSDRIVE_UPDATEJOBS_REQUEST,
    editCampusDriveJobsSaga
  );
  yield takeLatest(
    ACTION_POST_PUBLISH_CORPORATE_JOBS_REQUEST,
    postPublishCorporateJobsRequest
  );

  yield takeLatest(
    ACTION_DELETE_CORPORATE_JOB_BYID_REQUEST,
    deleteJobByIdRequest
  );
}

// export function* addJobsWatcherSaga() {
//     yield takeLatest(ACTION_POST_CORPORATE_JOBS_REQUEST, addJobsSaga)
// }
