
import Axios from '../../../utils/axios';
import { toast } from 'react-toastify';
import * as actionTypes from './actionTypes';

export const GetTestimonialsAction = () => {
    return (dispatch) => {
        const URL = "testimonials/";
        Axios.get(URL)
            .then((res) => {
                var resp = res.data;
                dispatch({
                    type: actionTypes.TESTIMONIALS,
                    payload: resp
                });
            })
            .catch((err) => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}

export const GetMediaAction = () => {
    return (dispatch) => {
        const URL = "media/";
        Axios.get(URL)
            .then((res) => {
                var resp = res.data;
                dispatch({
                    type: actionTypes.MEDIA,
                    payload: resp
                });
            })
            .catch((err) => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}


export const GetInstructorsAction = () => {
    return (dispatch) => {
        const URL = "instructors/";
        Axios.get(URL)
            .then((res) => {
                var resp = res.data;
                dispatch({
                    type: actionTypes.INSTRUCTORS,
                    payload: resp
                });
            })
            .catch((err) => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
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
