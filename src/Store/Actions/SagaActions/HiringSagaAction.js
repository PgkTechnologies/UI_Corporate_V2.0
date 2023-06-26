import { ACTION_GET_CORPORATE_HIRING_REQUEST, ACTION_POST_CORPORATE_HIRING_REQUEST, ACTION_POST_PUBLISH_CORPORATE_HIRING_REQUEST, ACTION_GET_CORPORATE_HIRING_BYID_REQUEST, ACTION_PATCH_CORPORATE_HIRING_REQUEST, ACTION_CLONE_CORPORATE_HIRING_REQUEST, ACTION_DELETE_CORPORATE_HIRING_REQUEST} from "./SagaActionTypes"

export const HiringSagaAction = (payload) => {
    return {
        type: ACTION_GET_CORPORATE_HIRING_REQUEST,
        payload: payload
    }
};

export const AddHiringSagaAction = (payload) => {
    return {
        type: ACTION_POST_CORPORATE_HIRING_REQUEST,
        payload: payload
    }
};

export const actionPostPublishCorporateHiringRequest = (payload) => {
    return {
        type: ACTION_POST_PUBLISH_CORPORATE_HIRING_REQUEST,
        payload: payload
    }
}

export const actionGetCorporateHiringByIdRequest = (payload) => {
    return {
        type: ACTION_GET_CORPORATE_HIRING_BYID_REQUEST,
        payload: payload
    }
}

export const actionPatchCorporateHiringCriteriaRequest = (payload) => {
    return {
        type: ACTION_PATCH_CORPORATE_HIRING_REQUEST,
        payload: payload
    }
}

export const actionCloneHiringCriteriaRequest = (payload) => {
    return {
        type: ACTION_CLONE_CORPORATE_HIRING_REQUEST,
        payload: payload
    }
}

export const actionDeleteHiringCriteriaRequest = (payload) => {
    return {
        type: ACTION_DELETE_CORPORATE_HIRING_REQUEST,
        payload: payload
    }
}