import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/GetUserAction";
import { getPosts } from "../../Redux/GetPostsAction";
import MapComponenet from "../../Componenets/MapComponenet/MapComponenet";
import './MainPage.css'
import { SocketProvider, useSocket } from "../../Context/SocketProvider";
import AddPost from "../../Componenets/AddPost/AddPost";
import PostsFeed from "../../Componenets/PostsFeed/PostsFeed";
import AddAFriend from "../../Componenets/AddAFriend/AddAFriend";
import AddFriendGroup from "../../Componenets/AddFriendGroup/AddFriendGroup";
import Filter from "../../Componenets/Filter/Filter";
import Logout from "../../Componenets/Logout/Logout";


const MainPage = (props) => {
    const dispatcher = useDispatch();
    const [userInfo, setUserInfo] = useState({})
    const [map, setMap] = useState();
    const [renderAddPost, setRenderAddPost] = useState(false);
    const [renderAddFriend, setRenderAddFriend] = useState(false);
    const [renderAddFriendGroup, setRenderAddFriendGroup] = useState(false);
    const [renderMap, setRenderMap] = useState(true);
    const { isLoading, user, errorMessage } = useSelector(state => state.userInfo.userReducer);
    const { postIsLoading, posts, shownPosts, postErrorMessage } = useSelector(state => state.Posts.userReducer);
    const socket = useSocket();

    useEffect(async () => {
        dispatcher(getUser());
    }, [])


    useEffect(async () => {
        if (user) {
            setUserInfo(user);
            dispatcher(getPosts(user._id));
        }
        console.log("userChanged");
    }, [user])

    useEffect(() => {
        if (shownPosts)
            console.log(shownPosts);
    }, [shownPosts])

    const handleGoToAddAPostClick = () => {
        setRenderAddPost(!renderAddPost);
    }
    const ChangeBetweenMapAndFeed = () => {
        setRenderMap(!renderMap);
    }

    const handleGoToAddFriendClick = () => {
        setRenderAddFriend(!renderAddFriend)
    }

    const handleGoToAddFriendGroup = () => {
        setRenderAddFriendGroup(!renderAddFriendGroup)
    }

    


    return (<div>
        {userInfo ?
            <SocketProvider id={userInfo._id}>
                {renderAddFriend ?
                    <AddAFriend MoveToMainPage={handleGoToAddFriendClick} token={props.token} setToken={props.setToken} />
                    :
                    renderAddFriendGroup ?
                        <AddFriendGroup MoveToMainPage={handleGoToAddFriendGroup} token={props.token} setToken={props.setToken} />
                        :
                        renderAddPost ?
                            <AddPost MoveToMainPage={handleGoToAddAPostClick} />
                            :
                            <div className="MainPage">
                                <div className="leftSide">
                                    <div className="mainPageButtons">
                                        <button onClick={handleGoToAddAPostClick}>Add post</button>
                                        <button onClick={handleGoToAddFriendClick}>Add a friend</button>
                                        <button onClick={handleGoToAddFriendGroup}>Add friend group</button>
                                        <Logout token={props.token}  />
                                    </div>
                                    {isLoading && <h3>Loading...</h3>}
                                    {errorMessage && <h3>{errorMessage}</h3>}
                                    {userInfo && <h3>{userInfo.user_display}</h3>}
                                    <Filter />
                                </div>
                                {renderMap ?
                                    <MapComponenet setMap={setMap} change={ChangeBetweenMapAndFeed} token={props.token} setToken={props.setToken} />
                                    : <PostsFeed change={ChangeBetweenMapAndFeed} />
                                }
                            </div>
                }
            </SocketProvider> : <></>
        } </div>)
}
export default MainPage;