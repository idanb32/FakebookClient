import actionTypes from "./GetPostsActionTypes";
import axios from "axios";
const port = "http://localhost:3000/";

export const getPosts = (userId) => async (dispatch) => {
    dispatch(actionTypes.postsLoadStart());
    try {
        let posts = await axios.post(port + "friends/GetPostsOfFriends", { userId: userId });
        let data = posts.data;
        console.log(data);
        dispatch(actionTypes.postsLoadSuccess(data));
    }
    catch (err) {
        dispatch(actionTypes.postsLoadError(err));
    }
}

export const addPost =(post) =>{
    return{
        type: "ADD_POST",
        payload: post
    }
}
export const changePost =(post) =>{
    return{
        type: "CHANGE_POST",
        payload: post
    }
}

export const showPost =(posts) =>{
    return{
        type: "SHOW_POST",
        payload: posts
    }
}
export const showAll =() =>{
    return{
        type: "SHOW_ALL"
    }
}
