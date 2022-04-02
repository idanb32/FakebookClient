import { combineReducers } from "redux";


const initialState = {
    postIsLoading: false,
    posts: null,
    shownPosts: null,
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
                shownPosts: null,
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
                shownPosts: action.payload
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
                    posts: [...state.posts, action.payload],
                    shownPosts:[...state.shownPosts, action.payload]
                }
            }
        case 'CHANGE_POST':
            {
                let posts = state.posts.map((post) => {
                    if (post._id == action.payload._id) {
                        return action.payload;
                    }
                    return post;
                });

                let shownPosts = state.shownPosts.map((post) => {
                    if (post._id == action.payload._id) {
                        return action.payload;
                    }
                    return post;
                });
                return {
                    ...state,
                    posts: posts,
                    shownPosts: shownPosts
                }
            }
        case 'SHOW_POST':
            {
                console.log('in showPost');
                console.log(action.payload);
                return {
                    ...state,
                    shownPosts: [...action.payload]
                }
            }
        case 'SHOW_ALL':
            {
                return {
                    ...state,
                    shownPosts: [...state.posts]
                }
            }
        default: return state;
    }
}

export default combineReducers({
    userReducer
})