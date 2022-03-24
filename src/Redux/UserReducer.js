import { combineReducers } from "redux";


const initialState = {
    isLoading: false,
    user: null,
    errorMessage: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USERS_LOAD_START": {
            console.log("dispatched start")
            return {
                ...state,
                isLoading: true,
                user: null,
                errorMessage: null,
            };
        }

        case "USERS_LOAD_SUCCESS": {
            console.log("dispatched succsess")
            console.log(action.payload);
            console.log(state);
            return {
                ...state,
                isLoading: false,
                user: action.payload,
            };
        }
        case "USERS_LOAD_ERROR":
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
        default: return state;
    }
}

export default combineReducers({
    userReducer
})