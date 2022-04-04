
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../GlobalComponents/Input/Input";
import axios from "axios";

const port = "http://localhost:3000/";

const ForgetPassword = (props) => {
    const [userName, setUserName] = useState("");
    const [userNameValidator, setUserNameValidator] = useState("");
    const [password, setPassword] = useState("");
    const [passwordValidator, setPasswordValidator] = useState("");
    const [serverError, setServerError] = useState('');

    const handleUserName = (value) => {
        setUserName(value.target.value);
    }

    const handlePassword = (value) => {
        setPassword(value.target.value);
    }

    const submit = async () => {
        if (validate()) return;
        console.log("passedvalidate");
        let changePassObj = {
            username: userName,
            password: password
        }
        let serverRes = await axios.post(port+"authentication/changePassword" , changePassObj);
        console.log(serverRes.data);
        if (typeof serverRes.data =='string'){
            setServerError(serverRes.data);
        }
        else{
            props.login(serverRes.data);
        }
    }

    const validate = () => {
        let flag = false;
        if (userName == "" || userName == null || userName == undefined) {
            setUserNameValidator("To reset your password you need to insert a user name");
            flag = true;
        }
        else setUserNameValidator("");
        if (password == "" || password == null || password == undefined) {
            setPasswordValidator("To reset your password you need to insert a password");
            flag = true;
        }
        else setPasswordValidator("");
        return flag;
    }

    return (<div className="LoginWrapper">
        <div className="loginHeading">
            <h1 className="heading-1">Reset password</h1>
        </div>
        <div className="InputWrapper">
            <div className="inputWithValidator username">
                <Input onChange={handleUserName} placeholder="Username" className="Input" />
                <div className="ErrorMsg"> {userNameValidator}</div>
            </div>
            <div className="inputWithValidator password">
                <Input onChange={handlePassword} placeholder="New password" type="Password" />
                <div className="ErrorMsg"> {passwordValidator}</div>
            </div>
        </div>
        <div className="ErrorMsg">
            {serverError}
        </div>
        <div className="loginButtons">
            <button onClick={submit} className="btn"> Change password </button>
            <button onClick={props.moveToLogin}> Remmber your password ? </button>
            <Link to='/SignUp'>
                <button className="btn">Register</button>
            </Link>
        </div>
    </div>)

}
export default ForgetPassword;