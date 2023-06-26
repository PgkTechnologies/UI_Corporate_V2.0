import * as actionTypes from '../Actions/DashboardActions/actionTypes';
import * as SagaActionTypes from '../Actions/SagaActions/SagaActionTypes';

const INITIAL = {
    apiStatus: false,
    apiSuccess: false,
    apiError: false,
    balance: {},
    hiringCriteria: [],
    profileInfo: {},
    universalTutorialAccessToken: undefined,
    countries: []
}

const DashboardReducer = (state = INITIAL, action) => {
    
    switch (action.type) {
        // case actionTypes.BALANCE:
        //     return { ...state, balance: action.payload }

        case SagaActionTypes.ACTION_GET_CORPORATE_TOKENS_RESPONSE:
            return { ...state, balance: action.payload };

        case SagaActionTypes.ACTION_GET_CORPORATE_HIRING_RESPONSE:
            return { ...state, hiringCriteria: action.payload };

        case SagaActionTypes.ACTION_GET_CORPORATE_PROFILE_RESPONSE:
            return { ...state, profileInfo: action.payload };
        case actionTypes.APISTATUS:
            if(action.payload) {
                return { ...state, apiStatus: state.apiStatus + 1 }
            } else {
                return { ...state, apiStatus: state.apiStatus - 1 }
            }
        case SagaActionTypes.ACTION_SAVE_UNIVERSAL_ACCESS_TOKEN:
            return { ...state, universalTutorialAccessToken: action.payload };
        case SagaActionTypes.ACTION_SAVE_COUNTRIES:
            return { ...state, countries: action.payload };
        case actionTypes.SUCCESS:
            return { ...state, apiSuccess: action.payload }


        case actionTypes.RESET:
            return {
                apiSuccess: false,
                apiError: false,
            }

        default:
            return state;
    }
}

export default DashboardReducer;