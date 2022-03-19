import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../GlobalComponents/Input/Input";
import './Login.css'

const Login = () => {
    const [userName, setUserName] = useState("");
    const [userNameValidator, setUserNameValidator] = useState("");
    const [password, setPassword] = useState("");
    const [passwordValidator, setPasswordValidator] = useState("");

    const handleUserName = (value) => {
        setUserName(value.target.value);
    }

    const handlePassword = (value) => {
        setPassword(value.target.value);
    }


    const submit = () => {
        console.log('got into submit')
        if (validate()) return
        console.log('passed validate')
    }

    const validate = () => {
        let flag = false;
        if (userName == "" || userName == null || userName == undefined) {
            setUserNameValidator("To log-in you need to insert a user name");
            flag = true;
        }
        else setUserNameValidator("");
        if (password == "" || password == null || password == undefined) {
            setPasswordValidator("To log-in you need to insert a password");
            flag = true;
        }
        else setPasswordValidator("");
        return flag;
    }

    return (<div className="Login">
        <div className="LoginWrapper">
            <div className="loginHeading">
                <h1 className="heading-1">Login</h1>
            </div>
            <div className="InputWrapper">
                <div className="inputWithValidator username">
                    <Input onChange={handleUserName} placeholder="Username" className="Input" />
                    <div className="ErrorMsg"> {userNameValidator}</div>
                </div>
                <div className="inputWithValidator password">
                    <Input onChange={handlePassword} placeholder="Password" type="Password" />
                    <div className="ErrorMsg"> {passwordValidator}</div>
                </div>
            </div>
            <div className="loginButtons">
                <button onClick={submit} className="btn"> Login </button>
                <Link to='/SignUp'>
                    <button className="btn">Register</button>
                </Link>
            </div>
        </div>
    </div>
    )
}
export default Login;