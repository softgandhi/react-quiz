import {
    ADD_COMMENT,
    ActionTypes
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.QuizAnswer:
        console.log('article.js reducer Quiz Answer called.');
            return {
                ...state, quiz: action.payload.quiz
            }
        case ADD_COMMENT:
            console.log('article.js reducer called.');
            return {
                ...state,
                commentErrors: action.error ? action.payload.errors : null,
                comments: action.error ?
                    null :
                    (state.comments || []).concat([action.payload.comment])
            };
        default:
            return state;
    }
};
