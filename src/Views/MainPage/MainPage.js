import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/GetUserAction";
import MapComponenet from "../../Componenets/MapComponenet/MapComponenet";
import './MainPage.css'

const MainPage = (props) => {
    const dispatcher = useDispatch();
    const [userInfo, setUserInfo] = useState({})
    const { isLoading, user, errorMessage } = useSelector(state => state.userInfo.userReducer);
    useEffect(() => {
        dispatcher(getUser());
    }, [])

    useEffect(() => {
        console.log(user);
        console.log(isLoading);
        console.log("userChanged");
    }, [user, isLoading])

    return (<div className="MainPage">
        {isLoading && <h3>Loading...</h3>}
        {errorMessage && <h3>{errorMessage}</h3>} 
        {user&& <h3>{user.user_display}</h3>} 

        <MapComponenet />
    </div>)
}
export default MainPage;