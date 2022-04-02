import { useNavigate } from "react-router-dom";
import { useSocket } from "../../Context/SocketProvider";

const Logout = (props) => {
    const socket = useSocket();
    const nav = useNavigate();
    const handleLogOut = () => {
        console.log(props.token.refreshToken);
        if (!socket) return
        console.log("haveSocket");
        socket.emit('logOut', (props.token.refreshToken));
        localStorage.clear();
        window.location.reload();
    }

    return(<button onClick={handleLogOut}>
        Logout
    </button>)
}
export default Logout;

