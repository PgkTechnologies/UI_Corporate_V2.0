// import packages
import { put, call, takeLatest, select } from "redux-saga/effects";
import Axios from "../../utils/Axios";
import { toast } from "react-toastify";

import {
    ACTION_GET_DEPENDENCY_LOOKUPS_REQUEST,
    ACTION_GET_COUNTRY_CODES_REQUEST,
    ACTION_GET_STATES_BY_COUNTRY_NAME_REQUEST,
    ACTION_GET_CITIES_BY_STATE_NAME_REQUEST,
    ACTION_GET_CITIES_BY_COUNTRY_NAME_REQUEST,
    ACTION_GET_BULK_TOKEN_NUMBER_REQUEST,
    ACTION_GET_S3_ATTACH_REQUEST,
    ACTION_GET_STUDENT_NOTIFICATIONS_INFO_REQUEST,
    PATCH_NOTIFICATIONS,
    ACTION_CREATE_PAYMENT_REQUEST,
    VALIDATE_PAYMENT_ACTION_REQUEST
} from '../Actions/SagaActions/SagaActionTypes';

import * as actionTypes from '../Actions/CorporateActions/actionTypes';


import { actionUpdateGlobalLoaderSagaAction } from '../Actions/SagaActions/CommonSagaActions';
import { ValidatePaymentToken } from "../Actions/CorporateActions/CorporateAction";

const fullState = (state) => state;

const getDependencyLookupsRequest = (queryString) => {
    const URL = `/lut/?${queryString}`;
    return Axios.get(URL).then((res) => {
        return res.data;
    });
};

const getStringifyLookupKeys = (keys) => {
    if (keys.length) {
        return keys.map((item) => `lutList=${item}&`).join('').replace(/&$/, "")
    } else {
        return '';
    }
}

function* getDependencyLookupsRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    const lookupQueryString = getStringifyLookupKeys(action.payload.apiPayloadRequest);

    try {
        const response = yield call(getDependencyLookupsRequest, lookupQueryString);
        action.payload.callback(response);
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

const getCountryCodes = (action) => {
    const URL = "https://countriesnow.space/api/v0.1/countries/states";
    return Axios.get(URL)
        .then((res) => {
            return res.data;
        });
}

function* getCountryCodesRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const response = yield call(getCountryCodes);
        action.payload.callback(response);

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

const getStates = (accessToken, countryName) => {
    const header = {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + accessToken,
        }
    }

    const URL = "https://www.universal-tutorial.com/api/states/" + countryName;
    return Axios.get(URL, header)
        .then((res) => {
            return res.data;
        });
}

function* getStatesRequestSaga(action) {
    const wholeState = yield select(fullState);
    const universalTutorialAccessToken = wholeState.DashboardReducer?.universalTutorialAccessToken;

    yield put(actionUpdateGlobalLoaderSagaAction(true));
    try {
        if (universalTutorialAccessToken && action?.payload?.countryName) {
            const response = yield call(getStates, universalTutorialAccessToken, action.payload.countryName)
            if (action?.payload?.callback) {
                action.payload.callback(response)
            }
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

const getCities = (model) => {
    const URL = "https://countriesnow.space/api/v0.1/countries/state/cities";
    return Axios.post(URL, model)
        .then((res) => {
            return res.data;
        });
}

function* getCitiesRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const response = yield call(getCities, action.payload.model);
        if (action?.payload?.callback) {
            action.payload.callback(response.data)
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


const getCitiesByCountry = (model) => {
    const URL = "https://countriesnow.space/api/v0.1/countries/cities";
    return Axios.post(URL, { "country": model })
        .then((res) => {
            return res.data;
        });
}

function* getCitiesByCountryRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const response = yield call(getCitiesByCountry, action.payload.countryName);
        if (action?.payload?.callback) {
            action.payload.callback(response.data)
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



const getBulkToken = (action) => {
    const URL = "/pg/tknBulkPrice";
    return Axios.get(URL)
        .then((res) => {
            return res.data;
        });
}

function* getBulkTokenRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    try {
        const response = yield call(getBulkToken);
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

const getS3Attach = (path) => {
    const URL = `/u/file?url=${path}`
    return Axios.get(URL)
        .then((res) => {
            return res.data;
        });
}

function* getS3AttachRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    try {
        const response = yield call(getS3Attach, action.payload.path);
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

const pathchNotifications = (selectedIDs) => {

    const URL = '/nft/nftData';
    const token = localStorage.getItem('AUTH');
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'application/json'
        }
    }

    return Axios.patch(URL, selectedIDs,header).then((res) => {
        let resp = res.data;
    }
    )

}

function* pathchNotificationsSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true))
    try {
        const response = yield call(pathchNotifications, action.payload.selectedIDs)
        action.payload.callback(response);
    }
    catch (error) {
        if (error?.response) {
            toast.error(error?.response?.data?.errors[0]?.message)
        }
        else {
            toast.error('Something gone unexpected')
        }
    }
    finally {
        yield put(actionUpdateGlobalLoaderSagaAction(false))
    }

}



const createPaymentToken = (action) => {
    const data = action.payload;
    let formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const URL = "/pg/createPayment";
    return Axios.post(URL, formData)
      .then((res) => {
        return res.data;
      });
  };
  

function* cratePaymentRequest(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    try {
      const response = yield call(createPaymentToken, action);
      sessionStorage.setItem('orderID', response.orderID);
    //   action.payload.callback(response);
   
      yield put({ type: actionTypes.PAYMENTORDER, payload: response });
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

  //Payment validate 
  
  function* ValidatePaymentAction(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));
    try {
      const response = yield call(ValidatePaymentToken, action.payload.apiPalyoadRequest);
      
      action.payload.callback(response)
     
      toast.success(response.messages[1]);
      toast.success(response.messages[2]);
    } catch (err) {
      if (err?.response) {
        
        toast.error(err?.response?.data?.errors[0]?.message);
      } else {
        //toast.error("Something Wrong!", err?.message);
      }
    } 
    finally {
      yield put(actionUpdateGlobalLoaderSagaAction(false));
    }
  }




const getStudentNotificationsRequest = (size, page) => {
    const URL = `/nft/all/${size}/${page}`;

    const token = localStorage.getItem('AUTH');
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'application/json'
        }
    }

    return Axios.get(URL,header).then(resp => resp.data);
}

function* getStudentNotificationsRequestSaga(action) {
    yield put(actionUpdateGlobalLoaderSagaAction(true));

    try {
        const response = yield call(getStudentNotificationsRequest, action.payload.size, action.payload.page);
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

export default function* CommonWatcherSaga() {
    yield takeLatest(ACTION_GET_DEPENDENCY_LOOKUPS_REQUEST, getDependencyLookupsRequestSaga);
    yield takeLatest(ACTION_GET_COUNTRY_CODES_REQUEST, getCountryCodesRequestSaga);
    yield takeLatest(ACTION_GET_STATES_BY_COUNTRY_NAME_REQUEST, getStatesRequestSaga);
    yield takeLatest(ACTION_GET_CITIES_BY_STATE_NAME_REQUEST, getCitiesRequestSaga);
    yield takeLatest(ACTION_GET_CITIES_BY_COUNTRY_NAME_REQUEST, getCitiesByCountryRequestSaga);
    yield takeLatest(ACTION_GET_BULK_TOKEN_NUMBER_REQUEST, getBulkTokenRequestSaga);
    yield takeLatest(ACTION_GET_S3_ATTACH_REQUEST, getS3AttachRequestSaga);
    yield takeLatest(ACTION_GET_STUDENT_NOTIFICATIONS_INFO_REQUEST, getStudentNotificationsRequestSaga);
    yield takeLatest(PATCH_NOTIFICATIONS, pathchNotificationsSaga);
    yield takeLatest(ACTION_CREATE_PAYMENT_REQUEST, cratePaymentRequest);
    yield takeLatest(VALIDATE_PAYMENT_ACTION_REQUEST, ValidatePaymentAction);


}
