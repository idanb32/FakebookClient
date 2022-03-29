import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/GetUserAction";
import { getPosts } from "../../Redux/GetPostsAction";
import MapComponenet from "../../Componenets/MapComponenet/MapComponenet";
import './MainPage.css'
import { SocketProvider } from "../../Context/SocketProvider";
import { Link } from "react-router-dom";
import AddPost from "../../Componenets/AddPost/AddPost";
import PostsFeed from "../../Componenets/PostsFeed/PostsFeed";
import AddAFriend from "../../Componenets/AddAFriend/AddAFriend";


const MainPage = (props) => {
    const dispatcher = useDispatch();
    const [userInfo, setUserInfo] = useState({})
    const [map, setMap] = useState();
    const [renderAddPost, setRenderAddPost] = useState(false);
    const [renderAddFriend, setRenderAddFriend] = useState(false);
    const [renderMap, setRenderMap] = useState(true);
    const { isLoading, user, errorMessage } = useSelector(state => state.userInfo.userReducer);
    const { postIsLoading, posts, postErrorMessage } = useSelector(state => state.Posts.userReducer);
    useEffect(() => {
        dispatcher(getUser());
    }, [])

    useEffect(() => {
        console.log(user);
        console.log(isLoading);
        if (user) {
            setUserInfo(user);
            dispatcher(getPosts(user._id));
        }
        console.log("userChanged");
    }, [user, isLoading])

    useEffect(() => {
        if (posts)
            console.log(posts);
    }, [posts])

    const handleGoToAddAPostClick = () => {
        setRenderAddPost(!renderAddPost);
    }
    const ChangeBetweenMapAndFeed = () => {
        setRenderMap(!renderMap);
    }

    const handleGoToAddFriendClick = () => {
        setRenderAddFriend(!renderAddFriend)
    }

    return (<div>
        {userInfo ?
            <SocketProvider id={userInfo._id}>
                {renderAddFriend ? 
                <AddAFriend  MoveToMainPage={handleGoToAddFriendClick}/>
                    :
                    renderAddPost ?
                        <AddPost MoveToMainPage={handleGoToAddAPostClick} />
                        :
                        <div className="MainPage">
                            <div>
                                <button onClick={handleGoToAddAPostClick}>Add post</button>
                                <button onClick={handleGoToAddFriendClick}>Add a friend</button>
                                {isLoading && <h3>Loading...</h3>}
                                {errorMessage && <h3>{errorMessage}</h3>}
                                {user && <h3>{user.user_display}</h3>}
                            </div>
                            {renderMap ?
                                <MapComponenet setMap={setMap} change={ChangeBetweenMapAndFeed} />
                                : <PostsFeed change={ChangeBetweenMapAndFeed} />
                            }
                        </div>
                }
            </SocketProvider> : <></>
        } </div>)
}
export default MainPage;