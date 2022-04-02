import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import Input from "../../GlobalComponents/Input/Input";
import axios from "axios";
import './PostMarker.css';

const port = "http://localhost:3000/";

const PostMarker = (props) => {
    const [fileName, setFileName] = useState("");
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [Like, setLike] = useState(false);
    const { isLoading, user, errorMessage } = useSelector(state => state.userInfo.userReducer);

    useEffect(() => {
        let fileNameInArr = props.post.image_url.split('/');
        let fileName = fileNameInArr[fileNameInArr.length - 1];
        setFileName(fileName);
        if (user) {
            let flag = props.post.likes.includes(user._id);
            setLike(flag);
        }
        console.log(user);
    }, [props.post, user])

    const openUp = () => {
        setOpen(!open);
    }

    const handleCommentChange = (value) => {
        setComment(value.target.value);
    }

    const handleLikeClicked = (e) => {
        setLike(!Like);
    }

    const LikedCheck = (e) => {
        return Like;
    }

    const handleLikeComment = async () => {
        let serverRespond = await axios.post(port + 'friends/AddLikeAndComment', {
            userId: user._id,
            comment: comment,
            Like: Like,
            postId: props.post._id
        });
        console.log(serverRespond);
        setComment("")
        setOpen(false);
    }

    return (<div className="PostMarker" >
        <div className="imgContainer" onClick={openUp}>
            <img src={port + 'images/' + fileName} className='img' />
        </div>
        <div className="PostTextContainer">
            Post:  {props.post.text}
        </div>
        {open ?
            <div className="openPost">
                <div className="TimePostedContainer">
                    Time posted:  {props.post.time_posted}
                </div>
                <div className="AddCommentContainer">
                    <Input onChange={handleCommentChange} placeholder="Add comment" />
                </div>
                <div className="LikeContainer">
                    Like:
                    <Input type="radio"
                        checked={LikedCheck()}
                        onClick={handleLikeClicked}
                        className="radioInput"
                    />
                </div>
                <div>
                    <button onClick={handleLikeComment}>Save comment and like </button>
                </div>
            </div>
            : <></>}
    </div>)
}
export default PostMarker