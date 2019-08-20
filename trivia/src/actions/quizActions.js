import axios from 'axios';

export const LOAD_QUESTIONS = 'LOAD_QUESTIONS';
export const LOAD_QUESTIONS_SUCCESS = 'LOAD_QUESTIONS_SUCCESS';
export const LOAD_QUESTIONS_FAILURE = 'LOAD_QUESTIONS_FAILURE';

export const getQuestions = () => {
    return dispatch => {
        dispatch({
            type: LOAD_QUESTIONS
        });

        axios.get('https://opentdb.com/api.php?amount=20&category=11&difficulty=easy&type=multiple')
            .then((response) => {
                dispatch({
                    type: LOAD_QUESTIONS_SUCCESS,
                    payload: response.data
                })
                console.log("res",response)
            })
            .catch((error) => {
                dispatch({
                    type: LOAD_QUESTIONS_FAILURE
                });
            });
    }
}