import actionTypes from "./GetUserActionTypes";
import axios from "axios";
const port = "http://localhost:3000/"
const key = "fakebookundefined";

export const getUser = () => async (dispatch) => {
    dispatch(actionTypes.userLoadStart());

    let token = localStorage.getItem(key);
    let sendMe = JSON.parse(token);
    console.log(sendMe);
    try {
        let res = await axios.post(port + "authentication/getInfo", { "token": sendMe.accessToken });
        let total = res.data;
        if (total != "Expired") dispatch(actionTypes.userLoadSuccess(total));
        else {
            try {
                console.log('expired')
                let res2 = await axios.post(port + "authentication/refreshTheToken", { "refreshToken": sendMe.refreshToken });
                localStorage.removeItem(key)
                localStorage.setItem(key, JSON.stringify(res2.data.token));
                total = res2.data.user;
                console.log(total)
                console.log(res2.data)
                dispatch(actionTypes.userLoadSuccess(total));
            }
            catch (err1) { dispatch(actionTypes.userLoadError(err1)) }
        }
    }
    catch (err2) { dispatch(actionTypes.userLoadError(err2)) }
}