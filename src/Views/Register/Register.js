import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../GlobalComponents/Input/Input";
import './Register.css'
import 'axios';
import axios from "axios";

const Register = () => {
    const [userName, setUserName] = useState("");
    const [userNameValidator, setUserNameValidator] = useState("");
    const [password, setPassword] = useState("");
    const [passwordValidator, setPasswordValidator] = useState("");
    const [email, setEmail] = useState("");
    const [emailValidator, setEmailValidator] = useState("");
    const [userDisplay, setUserDisplay] = useState("");
    const [userDisplayValidator, setUserDisplayValidator] = useState("");
    const [profileImg, setProfileImg] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    const [file, setFile] = useState();


    const handleUserName = (value) => {
        setUserName(value.target.value);
    }

    const handleEmail = (value) => {
        setEmail(value.target.value);
    }

    const handlePassword = (value) => {
        setPassword(value.target.value);
    }

    const handleUserDisplay = (value) => {
        setUserDisplay(value.target.value);
    }

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfileImg(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        setFile(e.target.files[0]);
    };



    const submit = () => {
        if (validate()) return
        console.log('passed validate')
        if (profileImg != "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png") {
            let data = new FormData();
            data.append("file", file);
            axios.post('http://localhost:3000/file/upload', data)
                .then((res) => {
                    console.log(res.data)
                })
                .catch((err) => { console.log(err) })
        }
    }

    const validate = () => {
        let flag = false;
        if (userName == "" || userName == null || userName == undefined) {
            setUserNameValidator("Please make sure you enter a user name");
            flag = true;
        }
        else setUserNameValidator("");
        if (password == "" || password == null || password == undefined) {
            setPasswordValidator("Please make sure you enter a password");
            flag = true;
        }
        else setPasswordValidator("");
        if (email == "" || email == null || email == undefined) {
            setEmailValidator("Please make sure you enter an email adress");
            flag = true;
        }
        else setEmailValidator("");
        if (userDisplay == "" || userDisplay == null || userDisplay == undefined) {
            setUserDisplayValidator("Please make sure you enter a user display");
            flag = true;
        }
        else setUserDisplayValidator("");
        return flag;
    }

    return (<div className="register">
        <div className="registerWrapper">
            <div className="registerHeading">
                <h1 className="heading-1">Register</h1>
            </div>
            <div className="InputWrapper">
                <div className="inputWithValidator username">
                    <Input onChange={handleUserName} placeholder="Username" />
                    <div className="ErrorMsg"> {userNameValidator}</div>
                </div>
                <div className="inputWithValidator password">
                    <Input onChange={handlePassword} placeholder="Password" />
                    <div className="ErrorMsg"> {passwordValidator}</div>
                </div>
                <div className="inputWithValidator email">
                    <Input onChange={handleEmail} placeholder="Email" />
                    <div className="ErrorMsg"> {emailValidator}</div>
                </div>
                <div className="inputWithValidator userDisplay">
                    <Input onChange={handleUserDisplay} placeholder="userDisplay" />
                    <div className="ErrorMsg"> {userDisplayValidator}</div>
                </div>
                <div className="imgDiv">
                    <img src={profileImg} alt="" className="img" />
                    <Input type="file" onChange={imageHandler} placeholder="Profie picture" accept="image/*" className="imgInput" />
                </div>
             
            </div>
            <div className="registerButtons">
                <button onClick={submit} className="btn"> Register </button>
                <Link to='/'>
                    <button className="btn">Already have an account? </button>
                </Link>
            </div>
        </div>
    </div>
    )
}
export default Register;