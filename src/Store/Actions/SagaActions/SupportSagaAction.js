import {
    ACTION_GET_TICKET_CONVO_REQUEST,
    ACTION_POST_SUPPORT_REQUEST,
    ACTION_GET_ALL_TICKETS_REQUEST,
    ACTION_CLOSE_TICKET_REQUEST

} from "./SagaActionTypes";


export const actionPostSupport = (request) => {
    return {
        type: ACTION_POST_SUPPORT_REQUEST,
        payload: request,
    };
};

export const actionGetAllTicketsSupport = (request) => {
    return {
        type: ACTION_GET_ALL_TICKETS_REQUEST,
        payload: request,
    };
};

export const actionGetTicketConvoSupport = (request) => {
    return {
        type: ACTION_GET_TICKET_CONVO_REQUEST,
        payload: request,
    };
};

export const actionCloseTicketRequest = (payload) => {
    return {
        type: ACTION_CLOSE_TICKET_REQUEST,
        payload: payload
    }
}
