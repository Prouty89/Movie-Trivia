import {
    LOAD_QUESTIONS,
    LOAD_QUESTIONS_SUCCESS,
    LOAD_QUESTIONS_FAILURE,
} from '../actions'

const initialState = {
    isLoading: false,
    isError: false,
    questions: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_QUESTIONS:
            return {
                ...state,
                isLoading: true,
                isError: false,
                questions: []
            }
        case LOAD_QUESTIONS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                questions: action.payload.results
            }
        case LOAD_QUESTIONS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state;
    }
}

