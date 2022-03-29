import { useEffect, useState } from "react";
import "./PostFeed.css";
import { useSelector } from "react-redux";
const port = "http://localhost:3000/";

const PostsFeed = (props) => {
    const { postIsLoading, posts, postErrorMessage } = useSelector(state => state.Posts.userReducer);
    const [postsArr, setPostsArr] = useState([]);
    useEffect(async () => {

        if (!posts) return
        setPostsArr(posts);

    }, [posts])

    const renderPosts = () => {
        if (postsArr) {
            return postsArr.map((post) => {
                let fileNameInArr = post.image_url.split('/');
                let fileName = fileNameInArr[fileNameInArr.length - 1];
                return (<div className="Post" key={post._id}>
                    <div>{post.text} </div>
                    <img src={port+'images/'+fileName} className='img'/>
                </div>)
            })
        }
    }

    return (<div className="PostFeed">
        <button onClick={props.change} >Show map insted </button>
        {renderPosts()}
    </div>)
}
export default PostsFeed;