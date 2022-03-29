
import './AddAFriend.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Input from '../../GlobalComponents/Input/Input';

import { addFriend } from '../../Redux/GetUserAction';
import { useSocket } from '../../Context/SocketProvider';

const port = "http://localhost:3000/";

const AddAFriend = (props) => {
    const { isLoading, user, errorMessage } = useSelector(state => state.userInfo.userReducer);
    const [addAbleUsers, setAddAbleUsers] = useState([]);
    const [searchBar, setSearchBar] = useState("");
    const dispatcher = useDispatch();
    const socket = useSocket();

    useEffect(async () => {
        if (!user) return;
        await getAllUsers();

    }, [user])

    useEffect(() => {
        if (socket) {
            console.log(socket);
            socket.on('addFriend', (friend) => {
                console.log('add a friend');
                dispatcher(addFriend(friend));
                updateFriends();
            })

        }
    }, [socket])

    const handleSearchBarChange = (value) => {
        setSearchBar(value.target.value);
    }

    const GetByName = () => {
        console.log(searchBar);
        console.log(user);
    }

    const getAllUsers = async () => {
        console.log(user.friends);
        let nonFriendsUsers = await axios.post(port + 'friends/GetAllNonFriendsUsers',
            { friends: user.friends });
        setAddAbleUsers(nonFriendsUsers.data);
    }

    const handleAddFriend = async (e) => {
        if (!user) return
        let friendId = e.currentTarget.value;
        let data = {
            id: user._id,
            friendId: friendId
        };
        socket.emit("AddANewFriend", (data));
    }

    const updateFriends = (friendId) => {
        let newArr = addAbleUsers.filter(item => item.id !== friendId);
        setAddAbleUsers(newArr);
    }

    const renderFriends = () => {
        let index = -1;
        return addAbleUsers.map((friend) => {
            index++;
            return (<div className='potianalFriend' key={friend.id + "_" + index}>
                <div className='potianalFriendName partLine'>Name : {friend.friendName}</div>
                <div className='addFriendContainer partLine'>
                    <button className='btn addFriendBtn' value={friend.id} onClick={handleAddFriend}>Addd this friend!</button>
                </div>
            </div>)
        })
    }

    return (<div className='AddAFriend'>
        <div className='searcher'>
            <Input onChange={handleSearchBarChange} classNameInput="Input" className="Input" placeholder="Enter name to search by" />
            <div className='addAFriendSearchBarBtns'>
                <button onClick={GetByName}>Search</button>
                <button onClick={getAllUsers}>Get All</button>
            </div>
        </div>
        <div className='friendsTableContainer'>
            {renderFriends()}
        </div>

        <div className='addAFriendContainer'>
            <button onClick={props.MoveToMainPage}>Move to main page </button>
        </div>
    </div>)

}

export default AddAFriend;