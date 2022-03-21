import React, { useEffect } from "react";
import Login from "../Login/Login";
import MainPage from "../MainPage/MainPage";
import useLocalStorage from "../../Hooks/Localstorage";
import { useLocation } from "react-router-dom";
import axios from 'axios'

const port = "http://localhost:3000/"

const MainView = () => {
    const [token, setToken] = useLocalStorage();
    const location = useLocation();

    useEffect(() => {
        if (location.state)
            setToken(location.state.token)
        if (token) {
            axios.post(port + "authentication/refreshTheToken", { refreshToken: token.refreshToken })
                .then((resault) => {
                    let newToken = {
                        accessToken: resault.data,
                        refreshToken: token.refreshToken
                    };
                    setToken(newToken);
                })
                .catch((error) => console.log(error));
        }
    }, [location.state])

    return (<div className="MainView">
        {token ? <MainPage token={token} /> : <Login logIn={setToken} />}
    </div>)
}

export default MainView;