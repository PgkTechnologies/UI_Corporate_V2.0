import * as actionTypes from '../Actions/HomeActions/actionTypes';

const INITIAL = {
    testimonials: [],
    media: [],
    instructors: [],
}

const HomeReducer = (state = INITIAL, action) => {
    switch (action.type) {
        case actionTypes.TESTIMONIALS:
            return { ...state, testimonials: action.payload }

        case actionTypes.MEDIA:
            return { ...state, media: action.payload }

            case actionTypes.INSTRUCTORS:
                return { ...state, instructors: action.payload }

        default:
            return state;
    }
}

export default HomeReducer;