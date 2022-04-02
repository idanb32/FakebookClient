import { useEffect, useState } from "react";
import "./PostFeed.css";
import { useDispatch, useSelector } from "react-redux";
import { changePost } from "../../Redux/GetPostsAction";
import axios from "axios";
import Input from "../../GlobalComponents/Input/Input";
import { useSocket } from "../../Context/SocketProvider";
const port = "http://localhost:3000/";

const PostsFeed = (props) => {
    const { postIsLoading, posts, shownPosts, postErrorMessage } = useSelector(state => state.Posts.userReducer);
    const { isLoading, user, errorMessage } = useSelector(state => state.userInfo.userReducer);
    const [postsArr, setPostsArr] = useState([]);
    const [renderMyPost, setRenderMyPost] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [addTags, setAddTags] = useState([]);
    const [removeTags, setRemoveTags] = useState([]);
    const [addUserNamesTags, setAddUserNamesTags] = useState([]);
    const [removeUserTags, setRemoveUser] = useState([]);
    const [editPostValidator, setEditPostValidator] = useState([]);
    const socket = useSocket();
    const dispatch = useDispatch();


    const handleEditMyFeed = () => {
        setRenderMyPost(!renderMyPost);
    }

    useEffect(() => {
        if (!socket) return;
        if (socket.hasListeners('postHasBeenUpdated')) return;
        socket.on('postHasBeenUpdated', (post) => {
            console.log('in the socket on post has been updated');
            console.log(post);
            dispatch(changePost(post));
            setReRender(!reRender);
        })

    }, [socket])

    useEffect(async () => {

        if (renderMyPost) {
            if (!user) return;
            let serverRes = await axios.post(port + 'friends/GetMyPosts', { id: user._id });
            let myPosts = serverRes.data;
            if (!myPosts) return
            let serverRespond = await Promise.all(myPosts.map(async (post) => {
                let userName = await axios.post(port + 'friends/GetAllFriendsName', { friends: post.user_tags });
                post.userName = userName.data;
                return post;
            }))
            setPostsArr(serverRespond);
        }
        else {
            if (!shownPosts) return
            let serverRespond = await Promise.all(shownPosts.map(async (post) => {
                let userName = await axios.post(port + 'friends/GetAllFriendsName', { friends: post.user_tags });
                post.userName = userName.data;
                return post;
            }))
            setPostsArr(serverRespond);
        }
    }, [shownPosts, renderMyPost])

    const renderPosts = () => {
        if (postsArr) {
            let index = -1;
            return postsArr.map((post) => {
                index++;
                let fileNameInArr = post.image_url.split('/');
                let fileName = fileNameInArr[fileNameInArr.length - 1];
                return (<div className="Post" key={post._id}>
                    <div className="postText">
                        <label>Post text: </label>
                        {post.text}
                    </div>
                    <img src={port + 'images/' + fileName} className='img' />
                    <div className="tagDisplay">
                        <label>Tags:</label>
                        {renderMyPost ? <div>
                            {renderEditTags(post.tags, index)}
                            <Input id={index} onChange={handleEditTagsInput} />
                            <div>
                                <label>Removed tags: </label>
                                {renderRemovedTags(index)}
                            </div>
                        </div>
                            : renderTags(post.tags)}
                    </div>
                    <div className="userTags">
                        <label>User tagged:</label>
                        {renderMyPost ? <div>
                            {renderEditUserTagged(post.userName, index)}
                            <Input id={index} onChange={handleEditUserTagsInput} />
                            <div>
                                <label>Removed users id: </label>
                                {renderRemovedUserTags(index)}
                            </div>
                        </div>
                            : renderUserTagged(post.userName)}
                    </div>
                    <div className="singlePostTimePosted">
                        <label>Time posted: </label>
                        <div>
                            {post.time_posted}
                        </div>
                    </div>
                    {renderMyPost ?
                        <div className="singlePostBtns">
                            <button className="singlePostSubmit" onClick={handleSubmit} value={index}>Submit edit this post</button>
                            <div className="ErrorMsg">{editPostValidator[index]}</div>
                        </div>
                        : <></>}
                </div>)
            })
        }
    }

    const handleEditTagsInput = (id, e) => {
        let tmp = addTags;
        let index = id
        tmp[index] = e.target.value
        setAddTags(tmp);
    }

    const handleEditUserTagsInput = (id, e) => {
        let tmp = addUserNamesTags;
        let index = id
        tmp[index] = e.target.value
        setAddUserNamesTags(tmp);
    }

    const renderTags = (tags) => {
        return tags.map((tag) => {
            return (<div className="singleTagDisplay">
                {tag}
            </div>)
        })
    }
    const renderEditTags = (tags, index) => {
        return tags.map((tag) => {
            if (removeTags[index] && removeTags[index].includes(tag)) { return <></> }
            else if (isEmpty(tag)) return <></>
            return (<div className="singleTagDisplay">
                {tag}
                <button onClick={handleRemoveThisTag} value={tag + "_index:_" + index}>Remove this tag </button>
            </div>)
        })
    }

    const isEmpty = (str) => {
        return (!str || str.length === 0);
    }

    const renderRemovedTags = (index) => {
        if (!removeTags[index]) return
        return removeTags[index].map((tag) => {
            return (<div>
                {tag}
            </div>)
        })
    }


    const renderRemovedUserTags = (index) => {
        if (!removeUserTags[index]) return
        return removeUserTags[index].map((id) => {
            return (<div>
                {id}
            </div>)
        })
    }


    const handleRemoveThisTag = (e) => {
        let eventValue = e.currentTarget.value;
        let splitValue = eventValue.split('_index:_');
        let index = splitValue[1];
        let value = splitValue[0];
        if (removeTags[index] == undefined || removeTags[index].length == 0 || removeTags[index] == null) {
            let tmp = [];
            let tmp2 = removeTags;
            tmp.push(value);
            tmp2[index] = tmp;
            console.log(tmp2);
            setRemoveTags(tmp2);
        }
        else {
            let tmp = removeTags[index];
            tmp.push(value);
            let tmp2 = removeTags;
            tmp2[index] = tmp;
            console.log(tmp2);
            setRemoveTags(tmp2);
        }
        setReRender(!reRender);
    }

    const renderUserTagged = (userTags) => {
        return userTags.map((userName) => {
            return (<div className="singleUserNameDisplay">
                {userName.friendName}
            </div>)
        })
    }

    const renderEditUserTagged = (userTags, index) => {
        return userTags.map((userName) => {
            if (removeUserTags[index])
                if (removeUserTags[index].includes(userName.id)) return <></>
            return (<div className="singleUserNameDisplay">
                {userName.friendName}
                <button onClick={handleRemoveUserTag} value={userName.id + "_index:_" + index}>Remove this user tag </button>
            </div>)
        })
    }

    const handleRemoveUserTag = (e) => {
        let eventValue = e.currentTarget.value;
        let splitValue = eventValue.split('_index:_');
        let index = splitValue[1];
        let value = splitValue[0];
        if (removeUserTags[index] == undefined || removeUserTags[index].length == 0 || removeUserTags[index] == null) {
            let tmp = [];
            let tmp2 = removeUserTags;
            tmp.push(value);
            tmp2[index] = tmp;
            console.log(tmp2);
            setRemoveUser(tmp2);
        }
        else {
            let tmp = removeUserTags[index];
            tmp.push(value);
            let tmp2 = removeUserTags;
            tmp2[index] = tmp;
            console.log(tmp2);
            setRemoveUser(tmp2);
        }
        setReRender(!reRender);
    }

    const handleSubmit = async (e) => {
        let index = e.currentTarget.value;
        if (validate(index)) {
            setReRender(!reRender);
            return
        }
        let data = {};
        if (removeUserTags[index])
            data.RemoveUserTags = removeUserTags[index];
        else data.RemoveUserTags = []
        if (removeTags[index])
            data.RemoveTags = removeTags[index];
        else data.RemoveTags = [];
        if (addTags[index]) {
            let tags = addTags[index].split(' ');
            data.AddTags = tags;
        }
        else data.AddTags = []
        if (addUserNamesTags[index]) {
            let userTags = addUserNamesTags[index].split(' ');
            data.UserTags = userTags;
        } else data.UserTags = [];
        let post = postsArr[index];
        console.log('pre change:');
        console.log(post);
        data.id = post._id;
        console.log("The change:");
        console.log(data);
        let socketData = { data: data, friends: user.friends, id: user._id }
        socket.emit('updatedPost', socketData);
    }

    const validate = (index) => {
        if (!removeUserTags[index] && !removeTags[index] && !addTags[index] && !addUserNamesTags[index]) {
            let tmp = editPostValidator;
            tmp[index] = 'YOU MUST ENTER AT LEAST ONE PARAMTER TO UPDATE THIS POST'
            setEditPostValidator(tmp);
            return true;
        }
        else {
            let tmp = editPostValidator;
            tmp[index] = ''
            setEditPostValidator(tmp);
            return false;
        }
    }

    return (<div className="PostFeed">
        <button onClick={props.change} >Show map insted </button>
        {renderPosts()}
        <button onClick={handleEditMyFeed} >{renderMyPost ? "Show feed" : "Edit my feed insted"} </button>
    </div>)
}
export default PostsFeed;