import { createStore, combineReducers, applyMiddleware } from "redux";
import UserReducer from "./UserReducer";
import PostsReducer from "./PostsReducer";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];
const initalState = {};

const reducers = combineReducers({
    userInfo: UserReducer,
    Posts: PostsReducer
});

const store = createStore(reducers,
    initalState,
    composeWithDevTools(applyMiddleware(...middleware)));
export default store;