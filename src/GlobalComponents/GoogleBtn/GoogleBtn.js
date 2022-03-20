import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import './GoogleBtn.css';

const clientId = "240723681887-hevl38hkihf66jjgg7369c44obiapa0s.apps.googleusercontent.com"


const GoogleBtn = (props) => {

    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        let googleObj = {
            "email": res.profileObj.email,
            "userDisplay": res.profileObj.name,
            "googleId": res.profileObj.googleId,
            "imgurl": res.profileObj.imageUrl
        }
        props.SignUpWithGoogle(googleObj);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };


    return (<div className='GoogleBtn'>
        <GoogleLogin
            clientId={clientId}
            buttonText={props.text}
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    </div>)
}

export default GoogleBtn;