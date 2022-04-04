import React, { useState } from "react";
import { Link } from "react-router-dom";
import FacebookBtn from "../../GlobalComponents/FacebookBtn/FacebookBtn";
import GoogleBtn from "../../GlobalComponents/GoogleBtn/GoogleBtn";
import Input from "../../GlobalComponents/Input/Input";
import axios from "axios";
import ForgetPassword from "../../Componenets/ForgetPassword/ForgotPassword";
import './Login.css'


const port = "http://localhost:3000/"

const Login = (props) => {
    const [userName, setUserName] = useState("");
    const [userNameValidator, setUserNameValidator] = useState("");
    const [password, setPassword] = useState("");
    const [passwordValidator, setPasswordValidator] = useState("");
    const [serverError, setServerError] = useState('');
    const [inLogin, setInLogin] = useState(true);

    const handleUserName = (value) => {
        setUserName(value.target.value);
    }

    const handlePassword = (value) => {
        setPassword(value.target.value);
    }

    const handleMoveToForgot = () => {
        setInLogin(!inLogin);
    }


    const submit =  () => {
        if (validate()) return
        console.log('passed validate')
        let loginObj = {
            username: userName,
            password: password
        }
        axios.post(port + "authentication/login", loginObj).
            then((resault) => {
                let data = resault.data;
                console.log(data);
                if (typeof data == "string")
                    setServerError(data);
                else props.logIn(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const handleSignUpWithGoogle = (googleObj) => {
        axios.post(port + "authentication/loginWithGoogle", googleObj).
            then((resault) => {
                let data = resault.data;
                if (typeof data == "string")
                    setServerError(data);
                else props.logIn(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleSignUpWithFacebook = (facebookObj) => {
        axios.post(port + "authentication/loginWithFacebook", facebookObj).
            then((resault) => {
                let data = resault.data;
                console.log(data);
                if (typeof data == "string")
                    setServerError(data);
                else props.logIn(data);
            })
            .catch((error) => {
                console.log(error);
            });
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

    const loginWithNewPass = (token)=>{
        props.logIn(token);
    }

    return (<div className="Login">
        {inLogin ?
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
                    <div>
                        <GoogleBtn SignUpWithGoogle={handleSignUpWithGoogle} text="Sign in with google" />
                    </div>
                    <div>
                        <FacebookBtn SignUpWithFacebook={handleSignUpWithFacebook} />
                    </div>
                </div>
                <div className="ErrorMsg">
                    {serverError}
                </div>
                <div className="loginButtons">
                    <button onClick={submit} className="btn"> Login </button>
                    <button onClick={handleMoveToForgot}> Forget your password?</button>
                    <Link to='/SignUp'>
                        <button className="btn">Register</button>
                    </Link>
                </div>
            </div>
            :
            <ForgetPassword moveToLogin={handleMoveToForgot} login ={loginWithNewPass} />
        }

    </div>
    )
}
export default Login;