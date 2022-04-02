import React, { useEffect, useState } from "react";
import Input from "../../GlobalComponents/Input/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import './AddPost.css'
import { useSocket } from "../../Context/SocketProvider";
const key = "fakebookundefined"
const port = 'http://localhost:3000/';

const AddPost = (props) => {
    const [img, setImg] = useState();
    const [tags, setTags] = useState("");
    const [file, setFile] = useState();
    const [userTaged, setUerTaged] = useState([]);
    const [text, setText] = useState("");
    const [friends, setFriends] = useState([]);
    const [randomLocation, setRandomLocation] = useState(false);

    const [imgError, setImgError] = useState("");
    const [textError, setTextError] = useState("");
    const [serverError, setServerError] = useState("");
    const { isLoading, user, errorMessage } = useSelector(state => state.userInfo.userReducer);

    const socket = useSocket();
    const nav = useNavigate();

    useEffect(async () => {
        let token = localStorage.getItem(key);
        if (!token) nav('/');
        if (!user) return
        let serverRespond = await axios.post(port + "friends/GetFriends", { id: user._id });
        setFriends(serverRespond.data);
        console.log(user);
    }, [user])



    const handleText = (value) => {
        setText(value.target.value);
    }

    const handleTags = (value) => {
        setTags(value.target.value);
    }

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImg(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        setFile(e.target.files[0]);
    };

    const handleFriendClicked = (e) => {
        let value = e.currentTarget.value;
        let tmp = [...userTaged]
        if (tmp.includes(value)) {
            let newTmp = tmp.filter(e => e !== value)
            setUerTaged(newTmp);
        }
        else {
            tmp.push(value)
            setUerTaged(tmp);
        }
    }
    const isFriendsClicked = (value) => {
        let flag = userTaged.includes(value);
        return flag;
    }
    const randomLocationChecked = (e) => {
        return randomLocation;
    }

    const handleRandomLocationClicked = (e) => {
        setRandomLocation(!randomLocation);
        console.log(!randomLocation);
    }

    const renderFriendsTagged = () => {
        return friends.map((friend) => {
            return (<div key={friend.id} className="radioFriends">
                {friend.name} : 
                <Input type="radio"
                    value={friend.id}
                    onClick={handleFriendClicked}
                    checked={isFriendsClicked(friend.id)}
                    className="radioInput" />
            </div>)
        })
    }


    const submit = () => {
        if (validate()) return
        let tagArr = tags.split(" ");
        let data = new FormData();
        data.append("file", file);
        axios.post('http://localhost:3000/file/upload', data).then(async (res) => {
            let imageUrl = res.data;
            navigator.geolocation.getCurrentPosition((position) => {
                let location = [position.coords.latitude, position.coords.longitude];
                console.log(location);
                if (randomLocation) {
                    if (Math.floor(Math.random() * 2) == 0)
                        location[0] = location[0] + Math.floor(Math.random() * 9) / 10;
                    else
                        location[0] = location[0] - Math.floor(Math.random() * 9) / 10;
                    if (Math.floor(Math.random() * 2) == 0)
                        location[1] = location[1] + Math.floor(Math.random() * 9) / 10;
                    else
                        location[1] = location[1] - Math.floor(Math.random() * 9) / 10;
                }
                let post = {
                    text: text,
                    tags: tagArr,
                    userId: user._id,
                    user_tags: userTaged,
                    img: imageUrl,
                    location: location
                }
                let friendsId = friends.map((friend) => friend.id)
                let fullPost = {
                    post: post,
                    postTo: friendsId
                }
                socket.emit('addPost', (fullPost));
                console.log(fullPost);
            })
        })
            .catch((error) => {
                console.log(error);
            })

    }

    const validate = () => {
        let flag = false;
        if (text == "" || text == null || text == undefined) {
            setTextError("Please make sure you enter a post text");
            flag = true;
        }
        else setTextError("");
        if (img == "" || img == null || img == undefined) {
            setImgError("You must upload an image to post");
            flag = true;
        }
        else setImgError("");
        return flag;
    }

    return (<div className="post">
        <div className="postWrapper">
            <div className="postHeading">
                <h1 className="heading-1">Add post</h1>
            </div>
            <div className="InputWrapper">
                <div className="imgDiv inputWithValidator">
                    <img src={img} alt="" className="img" />
                    <Input type="file" onChange={imageHandler} placeholder="Profie picture" accept="image/*" className="imgInput" />
                    <div className="ErrorMsg"> {imgError}</div>
                </div>
                <div className="inputWithValidator text">
                    <Input onChange={handleText} placeholder="Text of post" />
                    <div className="ErrorMsg"> {textError}</div>
                </div>
                <div className="friendsTagged">
                    Friends :
                    {renderFriendsTagged()}
                </div>
                <div className="tags">
                    <Input onChange={handleTags} placeholder="tags of post" />
                </div>
                <div className="randomLocation">
                    Random location near you?
                    <Input type="radio"
                        checked={randomLocationChecked()}
                        onClick={handleRandomLocationClicked}
                        className="radioInput"
                    />
                </div>
            </div>
            <div className="ErrorMsg">
                {serverError}
            </div>
            <div className="addPostButtons">
                <button onClick={props.MoveToMainPage}>Move to main page</button>
                <button onClick={submit}>AddPost</button>
            </div>
        </div>
    </div>)
}

export default AddPost;