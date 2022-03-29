import React, { useEffect, useState, useContext } from "react";
import io from 'socket.io-client';

const SockettContext = React.createContext();
const port ="http://localhost:3001";

export function useSocket() {
    return useContext(SockettContext)
};

export function SocketProvider({ id, children }) {
    const [socket, setSocket] = useState();

    useEffect(() => {
        console.log('got to socketProvider');
        const newSocket = io(
            port
        );
        newSocket.on("connect",()=>{
            console.log("conected")
        });
        newSocket.emit("signIn",id);
        newSocket.on("test",()=> console.log('IT WORKEDA~!~!~'));
        setSocket(newSocket)
        return () => newSocket.close();
    }, [id])

    return (
        <SockettContext.Provider value={socket}>
            {children}
        </SockettContext.Provider>
    );

};