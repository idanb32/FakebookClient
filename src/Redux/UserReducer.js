import { combineReducers } from "redux";


const initialState = {
    isLoading: false,
    user: null,
    errorMessage: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USERS_LOAD_START": {
            return {
                ...state,
                isLoading: true,
                user: null,
                errorMessage: null,
            };
        }

        case "USERS_LOAD_SUCCESS": {
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
        case "ADD_FRIEND": {
            let friends = state.user.friends;
            friends.push(action.payload);
            let updatedUser = state.user;
            updatedUser.friends = friends;
            console.log(updatedUser);
            console.log(action.payload);
            return {
                ...state,
                user: updatedUser
            }
        }
        case "ADD_FRIEND_GROUP": {
            let friend_groups = state.user.friend_groups;
            friend_groups.push(action.payload);
            let updatedUser = state.user;
            updatedUser.friend_groups = friend_groups;
            return {
                ...state,
                user: updatedUser
            }
        }
        default: return state;
    }
}

export default combineReducers({
    userReducer
})