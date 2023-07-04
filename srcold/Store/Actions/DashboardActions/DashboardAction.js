

import Axios from '../../../utils/axios';
import { toast } from 'react-toastify';
import * as actionTypes from './actionTypes';

export const APIStatus = (val) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.APISTATUS, payload: val });
    }
}


// RESET ALL REDUCERES
export const ResetRdrAction = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.RESET,
            payload: undefined
        })
    }
}


export const GetTokensAction = () => {
    return (dispatch) => {
        const URL = '/t/balance';
        const token = localStorage.getItem('token');
        const header = {
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'application/json'
            }
        }
        Axios.get(URL, header)
            .then((res) => {
                let resp = res.data;
                dispatch({ type: actionTypes.BALANCE, payload: resp });
            })
            .catch((err) => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}