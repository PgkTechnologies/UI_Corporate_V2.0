
import Axios from '../../../utils/Axios';
import { toast } from 'react-toastify';
import * as actionTypes from './actionTypes';


// RESET ALL REDUCERES
export const ResetRdrAction = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.RESET,
            payload: undefined
        })
    }
}

export const APISuccess = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SUCCESS,
            payload: true
        })
    }
}
export const APIStatus = (val) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.APISTATUS, payload: val });
    }
}

export const APIError = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.ERROR,
            payload: true
        })
    }
}


export const GetCountryCodeAction = () => {
    return (dispatch) => {
        const URL = "http://restcountries.eu/rest/v2/all?fields=name;flag;callingCodes;";
        Axios.get(URL)
            .then((res) => {
                let resp = res.data;
                dispatch({ type: actionTypes.COUNTRYCODES, payload: resp });
            })
            .catch((err) => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}

// REGISTER (CORPORATE & UNIVERSITY)
export const SignupAction = (model, history, type) => {
    return (dispatch) => {
        dispatch(APIStatus(true));
        // const URL = "/o/signUp/Corporate";
        let URL;
        if (type === 'Corporate') {
            URL = "/o/signUp/Corporate";
        } else if (type === 'University') {
            URL = "/o/signUp/University";
        }
        let formData = new FormData();
        for (const key in model) {
            formData.append(key, model[key]);
        }
        dispatch({ type: actionTypes.CORPORATE, payload: model });
        Axios.post(URL, formData)
            .then((res) => {
                let resp = res.data;
                localStorage.removeItem('imgpath');
                localStorage.setItem('regStatus', JSON.stringify(resp));
                sessionStorage.setItem('steps', 3);
                dispatch({ type: actionTypes.STEPS, payload: 3 });
                // toast.success(resp.message);
                history('/register/authentication');
                dispatch(APIStatus(false));
            })
            .catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.errors[0].message);
                } else {
                    //toast.error("Something Wrong!", err.message);
                }
                dispatch(APIStatus(false));
            })
    }
}

// REGISTER (STUDENT)
export const StudentSignupAction = (model, history, type) => {
    return (dispatch) => {
        const URL = "/o/signUp/Student";
        let formData = new FormData();
        for (const key in model) {
            formData.append(key, model[key]);
        }
        dispatch(APIStatus(true));
        dispatch({ type: actionTypes.CORPORATE, payload: model });
        Axios.post(URL, formData)
            .then((res) => {
                let resp = res.data;
                localStorage.removeItem('imgpath');
                localStorage.setItem('regStatus', JSON.stringify(resp));
                sessionStorage.setItem('steps', 3);
                dispatch({ type: actionTypes.STEPS, payload: 3 });
                dispatch(APIStatus(false));
                toast.success(resp.message);
                history('/register/studentAuthentication');
            })
            .catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.errors[0].message);
                } else {
                    //toast.error("Something Wrong!", err.message);
                }
                dispatch(APIStatus(false));
            })
    }
}

// LOGIN
export const LoginUserAction = (model, history) => {
    return (dispatch) => {
        const URL = "/o/login";
        let formData = new FormData();
        formData.append('stakeholder', model.stakeholder);
        formData.append('userID', model.userID);
        formData.append('password', model.password);
        dispatch(APIStatus(true));
        Axios.post(URL, formData)
            .then((res) => {
                let resp = res.data;
                localStorage.setItem('token', resp.token);
                dispatch(APIStatus(false));
                toast.success("Login successful");
                if (resp.redirectURL === '/dashboard') {
                    history('/dashboard');
                } else {
                    history('/register/payment');
                }
            })
            .catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.errors[0].message);
                } else {
                    //toast.error("Something Wrong!", err.message);
                }
                dispatch(APIStatus(false));
            })
    }
}

// VERIFY OTP
export const VerifyOtpAction = (model, history) => {
    return (dispatch) => {
        // const URL = "/verifyMobile";
        const URL = "/o/verifyOTP";
        // if (type === 1) {
        //     URL = "/o/verifyMobile"
        // } else {
        //     URL = "/o/verifyEmail"
        // }
        let formData = new FormData();
        for (const key in model) {
            formData.append(key, model[key]);
        }
        dispatch(APIStatus(true));
        Axios.post(URL, formData)
            .then((res) => {
                let resp = res.data;
                dispatch(APIStatus(false));
                if (resp?.MobileVerified && resp?.emailVerified) {
                    sessionStorage.clear();
                    localStorage.setItem('token', resp.token);
                    dispatch(APIStatus(false));
                    toast.success(resp.message);
                    history('/register/completed');
                } else {
                    toast.error('OTP verification failed');
                }
            })
            .catch((err) => {
                if (err?.response) {
                    toast.error(err?.response?.data?.errors[0]?.message);
                } else {
                    //toast.error("Something Wrong!", err?.message);
                }
                dispatch(APIStatus(false));
            })
    }
}

// RESEND OTP
export const ResendOtpAction = (model) => {
    return (dispatch) => {
        const URL = "/o/resendOtp";
        let formData = new FormData();
        for (const key in model) {
            formData.append(key, model[key]);
        }
        dispatch(APIStatus(true));
        Axios.post(URL, formData)
            .then((res) => {
                let resp = res.data;
                toast.success(resp.message);
                dispatch(APIStatus(false));
            })
            .catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.errors[0].message);
                } else {
                    //toast.error("Something Wrong!", err.message);
                }
                dispatch(APIStatus(false));
            })
    }
}

export const GetCategoryListAction = (type) => {
    return (dispatch) => {
        // const URL = "/u/lut/?lutList=corporateType&lutList=corporateCategory&lutList=corporateIndustry";
        let URL;
        if (type === 'Corporate') {
            URL = "/u/lut/?lutList=corporateType&lutList=corporateCategory&lutList=corporateIndustry"
        } else if (type === 'University') {
            URL = "/u/lut/?lutList=universityCategory"
        }
        Axios.get(URL)
            .then((res) => {
                let resp = res.data;
                dispatch({ type: actionTypes.CATEGOTYLIST, payload: resp });
            })
            .catch((err) => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}

export const SaveCoprorateData = (data, step) => {
    return (dispatch) => {
        sessionStorage.setItem('steps', step);
        dispatch({ type: actionTypes.CORPORATE, payload: data });
        dispatch({ type: actionTypes.STEPS, payload: step });
    }
}


// CREATE PAYMENT
export const CreatePaymentAction = (model) => {
    return (dispatch) => {
        const URL = "/pg/createPayment";
        let formData = new FormData();
        for (const key in model) {
            formData.append(key, model[key]);
        }
        // formData.append('payType', val);
        // formData.append('payType', 'REG_FEE');
        dispatch(APIStatus(true));
        const token = localStorage.getItem('token');
        const header = {
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'application/json'
            }
        }
        Axios.post(URL, formData, header)
            .then((res) => {
                let resp = res.data;
                sessionStorage.setItem('orderID', resp.orderID);
                dispatch({ type: actionTypes.PAYMENTORDER, payload: resp });
                dispatch(APIStatus(false));
                // toast.success(resp.message);
                // history('/register/completed');
            })
            .catch((err) => {
                if (err.response) {
                    toast.error(err.response.data);
                } else {
                    //toast.error("Something Wrong!", err.message);
                }
                dispatch(APIStatus(false));
            })
    }
}

// VALIDATE PAYMENT
export const ValidatePaymentToken = (model) => {
    const URL = "/pg/verifyPayment";
    let formData = new FormData();                      //new entey
    formData.append('orderID', model);    //formData.append("orderID", model.apiPayload);
    formData.append('renewalYears',1)
    // dispatch(APIStatus(true));
    return Axios.post(URL, formData).then((res) => {
        return res.data;
    });


    // dispatch(APIStatus(true));
    // axios.post(instance+URL, formData, header)
    //     .then((res) => {
    //         let resp = res.data;
    //         resp?.messages?.forEach(key => {
    //             toast.success(key);
    //         });
    //         dispatch(APIStatus(false));
    //         dispatch({ type: actionTypes.REFERENCEOBJ, payload: JSON.parse(resp?.referenceObject) });
    //         model.callback(resp); //  new entry 
    //         // history('/register/completed');
    //     })
    //     .catch((err) => {
    //         if (err.response) {
    //             toast.error(err.response.data.errors[0].message);
    //         } else {
    //             //toast.error("Something Wrong!", err.message);
    //         }
    //         dispatch(APIStatus(false));
    //     })
}
