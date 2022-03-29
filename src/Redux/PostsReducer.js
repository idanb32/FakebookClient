import { combineReducers } from "redux";


const initialState = {
    postIsLoading: false,
    posts: null,
    postErrorMessage: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "POSTS_LOAD_START": {
            console.log("dispatched start")
            return {
                ...state,
                postIsLoading: true,
                posts: null,
                postErrorMessage: null,
            };
        }

        case "POSTS_LOAD_SUCCESS": {
            console.log("dispatched succsess")
            console.log(state);
            return {
                ...state,
                postIsLoading: false,
                posts: action.payload,
            };
        }
        case "POSTS_LOAD_ERROR":
            return {
                ...state,
                postIsLoading: false,
                postErrorMessage: action.payload,
            };
        case 'ADD_POST':
            {
                
                 return {
                     ...state,
                     posts: [...state.posts, action.payload]
                 }
            }
        default: return state;
    }
}

export default combineReducers({
    userReducer
})