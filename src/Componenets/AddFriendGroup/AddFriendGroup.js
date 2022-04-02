
import './AddFriendGroup.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Input from '../../GlobalComponents/Input/Input';

import { addFriendGroup } from '../../Redux/GetUserAction';
import { useSocket } from '../../Context/SocketProvider';

const port = "http://localhost:3000/";

const AddFriendGroup = (props) => {
    const { isLoading, user, errorMessage } = useSelector(state => state.userInfo.userReducer);
    const [updateRender, setUpdateRender] = useState(false);
    const [addAbleUsers, setAddAbleUsers] = useState([]);
    const [friendsThatAdded, setFriendsThatAdded] = useState([]);
    const [friendForGroup, setFriendForGroup] = useState([]);
    const [serverRespond, setServerRespond] = useState('')
    const [groupName, setGroupName] = useState("");
    const [groupNameValidator, setGroupNameValidator] = useState("");
    const [groupValidator, setGroupValidator] = useState("");
    const dispatcher = useDispatch();
    const socket = useSocket();

    useEffect(async () => {
        if (!user) return;
        await getAllUsers();

    }, [user])

    // need to change
    useEffect(() => {
        if (!socket) return;
        if (socket.hasListeners('addedToFriendGroup')) {
            console.log('has listener');
            return;
        }
        socket.on('addedToFriendGroup', async (friend) => {
            console.log('add friend group');
            dispatcher(addFriendGroup(friend));
            let newToken = await axios.post(port + "authentication/refreshTheToken", { refreshToken: props.token.refreshToken });
            setServerRespond(`The friend group was added `)
            await getAllUsers();
            console.log(newToken.data);
            props.setToken(newToken.data.token);

        })

    }, [socket])

    

    const handleGroupNameChange = (value) => {
        setGroupName(value.target.value);
    }


    const getAllUsers = async () => {
        console.log('in get all');
        let nonFriendsUsers = await axios.post(port + 'friends/GetAllFriendsName',
            { friends: user.friends });
        let newArr = nonFriendsUsers.data.filter(item => item.id !== user._id);
        setAddAbleUsers(newArr);
        setFriendForGroup([]);
        setFriendsThatAdded([]);
        setGroupName("");
        setUpdateRender(!updateRender);
    }

    const handleAddFriend = async (e) => {
        if (!user) return
        let index2 = e.currentTarget.value;
        let friendId = addAbleUsers[index2];
        if (!friendId) return;
        if (!friendId.hasOwnProperty('id')) return;
        let newFriendsForGroup = friendForGroup;
        if (newFriendsForGroup.includes(friendId.id)) return;
        console.log(friendId);
        newFriendsForGroup.push(friendId.id);
        console.log(newFriendsForGroup);
        let newFriendsThatAdded = friendsThatAdded;
        if (!friendId.hasOwnProperty('friendName'))
            newFriendsThatAdded.push('__')
        else
            newFriendsThatAdded.push(friendId.friendName)

        console.log(newFriendsThatAdded);
        let copy = addAbleUsers;
        let index = copy.indexOf(friendId);
        console.log(index);
        if (index !== -1) {
            copy.splice(index, 1);
        }
        setFriendForGroup(newFriendsForGroup);
        setFriendsThatAdded(newFriendsThatAdded);
        setAddAbleUsers(copy);
        setUpdateRender(!updateRender);
    }

    const handleSubmit = () => {
        if (!user) return;
        if (validate()) return;

        let copy = friendForGroup;
        copy.push(user._id);
        let data = { groupName: groupName, usersId: copy }

        socket.emit("AddANewFriendGroup", (data));
    }

    const validate = () => {
        let flag = false;
        if (groupName == "") {
            setGroupNameValidator("Please enter group name.");
            flag = true;
        }
        else setGroupNameValidator("");
        if (friendForGroup === undefined || friendForGroup.length == 0) {
            setGroupValidator("Please make sure you enter some friends before submiting");
            flag = true;
        }
        else setGroupValidator("");
        return flag;
    }

    const renderFriends = () => {
        let index = -1;
        return addAbleUsers.map((friend) => {
            index++;
            return (<div className='potianalFriend' key={friend.id + "_" + index}>
                <div className='potianalFriendName partLine'>Name : {friend.friendName}</div>
                <div className='addFriendContainer partLine'>
                    <button className='btn addFriendBtn' value={index} onClick={handleAddFriend}>Addd me to the group!</button>
                </div>
            </div>)
        })
    }

    const renderChosenFriends = () => {
        let index = -1;
        if (friendsThatAdded)
            return friendsThatAdded.map((friendName) => {
                index++;
                return (<div className='friend' key={friendName + index}>
                    {friendName}, 
                </div>)
            })
    }

    return (<div className='AddAFriend'>
        <div>
            <div className='topInput'>
                <Input onChange={handleGroupNameChange} classNameInput="Input" className="Input" placeholder="Enter group name" />
                <button onClick={getAllUsers}>Empty friends</button>
            </div>
            <div className="ErrorMsg"> {groupNameValidator}</div>
        </div>
        <div className='friendsGroupTableContainer'>
            {renderFriends()}
            <div className="ErrorMsg"> {groupValidator}</div>
        </div>
        <div className='chosenFriends'>
          <div className='chosenFriendsHeader'> Chosen friends of the group: </div> {renderChosenFriends()}
        </div>
        <div className='submitGroupFriends'>
            <button onClick={handleSubmit}>Submit</button>
        </div>
        <div>
            {serverRespond}
        </div>
        <div className='addAFriendContainer'>
            <button onClick={props.MoveToMainPage}>Move to main page </button>
        </div>
    </div>)

}

export default AddFriendGroup;