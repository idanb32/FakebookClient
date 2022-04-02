import React, { useEffect } from "react";
import Login from "../Login/Login";
import MainPage from "../MainPage/MainPage";
import useLocalStorage from "../../Hooks/Localstorage";
import { useLocation } from "react-router-dom";
import axios from 'axios';

import { Provider } from "react-redux";
import { createStore } from "redux";
import Store from "../../Redux/Store";

const port = "http://localhost:3000/"

const MainView = () => {
    const [token, setToken] = useLocalStorage();
    const location = useLocation();

    const changeToken =(token) =>{
        setToken(token);
    }

    useEffect(() => {
        if (location.state)
            setToken(location.state.token)
        if (token) {
            console.log('in use effect')
            axios.post(port + "authentication/refreshTheToken", { refreshToken: token.refreshToken })
                .then((resault) => {
                    let newToken2 = resault.data.token;
                    setToken(newToken2);
                })
                .catch((error) => console.log(error));
        }
    }, [location.state])

    return (<div className="MainView">
        {token ?
            <Provider store={Store}>
                <MainPage token={token} setToken={changeToken} />
            </Provider> :
            <Login logIn={setToken} />}
    </div>)
}

export default MainView;