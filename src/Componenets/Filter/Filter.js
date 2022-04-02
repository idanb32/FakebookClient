import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../GlobalComponents/Input/Input";
import { showPost } from "../../Redux/GetPostsAction";
import './Filter.css';

const port = 'http://localhost:3000/';

const Filter = (props) => {
    const { isLoading, user, errorMessage } = useSelector(state => state.userInfo.userReducer);
    const { postIsLoading, posts, postErrorMessage } = useSelector(state => state.Posts.userReducer);

    const [fromDate, setFromDate] = useState();
    const [fromDateValidate, setFromDateValidate] = useState("");
    const [toDate, setToDate] = useState();
    const [toDateValidate, setToDateValidate] = useState("");

    const [userNamesTags, setUserNamesTags] = useState("");
    const [userNamesTagsValidator, setUserNamesTagsValidator] = useState("");

    const [tags, setTags] = useState("");
    const [tagsValidator, setTagsValidator] = useState("");

    const [groupsNames, setGroupsNames] = useState([]);
    const [groupNamesChose, setGroupNamesChose] = useState([]);
    const [groupNamesValidator, setGroupNamesValidator] = useState("");

    const dispatch = useDispatch();

    useEffect(async () => {
        if (!user) return;
        let serverRes = await axios.post(port + 'friends/getFriendsGroupName', { groupId: user.friend_groups })
        setGroupsNames(serverRes.data);
    }, [user])

    const renderFriendsGroupNames = () => {
        let index = -1;
        return groupsNames.map((group) => {
            index++;
            return (<div key={group + index} className="radioFriendsGroups">
                {group.name}
                <Input type="radio"
                    value={group.id}
                    onClick={handleGroupClicked}
                    checked={isGroupChecked(group.id)}
                    className="radioInput" />
            </div>)
        })
    }

    const handleGroupClicked = (e) => {
        let value = e.currentTarget.value;
        let tmp = [...groupNamesChose]
        if (tmp.includes(value)) {
            let newTmp = tmp.filter(e => e !== value)
            setGroupNamesChose(newTmp);
        }
        else {
            tmp.push(value)
            setGroupNamesChose(tmp);
        }
    }

    const isGroupChecked = (value) => {
        let flag = groupNamesChose.includes(value);
        return flag;
    }

    const handleFilterByGroupNames = async () => {
        if (filterGroupValidator()) return;
        let data = {
            groupNames: groupNamesChose
        }
        let respondFromServer = await axios.post(port + 'filter/filterByGroupNames', data);
        dispatch(showPost(respondFromServer.data));

    }

    const filterGroupValidator = () => {
        let flag = false;
        if (groupNamesChose.length < 1) {
            flag = true;
            setGroupNamesValidator("Please enter group names")
        }
        else {
            setFromDateValidate("");
            setToDateValidate("");
            setUserNamesTagsValidator("");
            setTagsValidator("");
            setGroupNamesValidator("");
        }

        return flag
    }


    const handleTags = (e) => {
        setTags(e.target.value);
    }

    const handleUserTags = (e) => {
        setUserNamesTags(e.target.value);
    }

    const handleFilterOnlyByUserTagged = async () => {
        if (userTaggedValidate()) return;
        let userNamesTagged = userNamesTags.split(" ");
        let data = {
            friends: user.friends,
            userNameTags: userNamesTagged
        }
        let respondFromServer = await axios.post(port + 'filter/filterByTaggedUser', data);
        dispatch(showPost(respondFromServer.data));
    }

    const handleFilterByDate = async () => {
        if (dateValidate()) return;
        let data = {
            friends: user.friends,
            from: fromDate,
            to: toDate
        };
        let respondFromServer = await axios.post(port + 'filter/filterByDate', data);
        dispatch(showPost(respondFromServer.data));

    }

    const userTaggedValidate = () => {
        let flag = false;
        if (userNamesTags == "") {
            flag = true;
            setUserNamesTagsValidator("Please enter user names taggs");
        }
        else {
            setFromDateValidate("");
            setToDateValidate("");
            setUserNamesTagsValidator("");
            setTagsValidator("");
            setGroupNamesValidator("");
        }
        return flag;
    }

    const handleFilterOnlyTaggs = async () => {
        if (taggsValidate()) return;
        let tagsSplited = tags.split(" ");
        let data = {
            friends: user.friends,
            tags: tagsSplited
        }
        let respondFromServer = await axios.post(port + 'filter/filterByTags', data);
        dispatch(showPost(respondFromServer.data));
    }

    const taggsValidate = () => {
        let flag = false;
        if (tags == "") {
            flag = true;
            setTagsValidator("Please enter taggs");
        }
        else {
            setFromDateValidate("");
            setToDateValidate("");
            setUserNamesTagsValidator("");
            setTagsValidator("");
            setGroupNamesValidator("");

        }
        return flag;
    }


    const dateValidate = () => {
        let flag = false;
        if (!fromDate) {
            flag = true;
            setFromDateValidate('please enter a from date');
        } else {
            setFromDateValidate("");
            setToDateValidate("");
            setUserNamesTagsValidator("");
            setTagsValidator("");
            setGroupNamesValidator("");
        }
        if (!toDate) {
            flag = true;
            setToDateValidate('please enter a to date');
        } else {
            setFromDateValidate("");
            setToDateValidate("");
            setUserNamesTagsValidator("");
            setTagsValidator("");
            setGroupNamesValidator("");
        }
        return flag;
    }

    const handleFullSubmit = async () => {
        if (fullValidate()) return
        let tagsSplited = tags.split(" ");
        let userNamesTagged = userNamesTags.split(" ");
        let data = {
            friends: user.friends,
            tags: tagsSplited,
            from: fromDate,
            to: toDate,
            groupNames: groupNamesChose,
            userNameTags: userNamesTagged
        }
        let respondFromServer = await axios.post(port + 'filter/filterByAll', data);
        dispatch(showPost(respondFromServer.data));

    }

    const fullValidate = () => {
        let flag = false;
        if (!fromDate) {
            flag = true;
            setFromDateValidate('please enter a from date');
        } else {
            setFromDateValidate("");
            setToDateValidate("");
            setUserNamesTagsValidator("");
            setTagsValidator("");
            setGroupNamesValidator("");
        }
        if (!toDate) {
            flag = true;
            setToDateValidate('please enter a to date');
        } else {
            setFromDateValidate("");
            setToDateValidate("");
            setUserNamesTagsValidator("");
            setTagsValidator("");
            setGroupNamesValidator("");
        }
        if (tags == "") {
            flag = true;
            setTagsValidator("Please enter taggs");
        }
        else {
            setFromDateValidate("");
            setToDateValidate("");
            setUserNamesTagsValidator("");
            setTagsValidator("");
            setGroupNamesValidator("");
        }
        if (userNamesTags == "") {
            flag = true;
            setUserNamesTagsValidator("Please enter user names taggs");
        }
        else {
            setFromDateValidate("");
            setToDateValidate("");
            setUserNamesTagsValidator("");
            setTagsValidator("");
            setGroupNamesValidator("");
        }
        if (groupNamesChose.length < 1) {
            flag = true;
            setGroupNamesValidator("Please enter group names")
        }
        else {
            setFromDateValidate("");
            setToDateValidate("");
            setUserNamesTagsValidator("");
            setTagsValidator("");
            setGroupNamesValidator("");
        }
        return flag;
    }

    return (<div className="filterWrapper">
        <div className="fromDateToDate">
            <div>
                <label className="dateRange">Date Range</label>
            </div>
            <div>
                <label>From:</label>
                <Input type="date" onChange={event => setFromDate(event.target.value)} classNameInput="Input" className="innerInput" />
                <div className="ErrorMsg"> {fromDateValidate}</div>
            </div>
            <div>
                <label>To:</label>
                <Input type="date" onChange={event => setToDate(event.target.value)} classNameInput="Input" className="innerInput" />
                <div className="ErrorMsg"> {toDateValidate}</div>
            </div>
            <div>
                <button onClick={handleFilterByDate} >Filter only by date</button>
            </div>
        </div>
        <div className="userNameTags">
            <label>Filter by user tagged: (splited by ' '(space bar) ): </label>
            <Input onChange={handleUserTags} classNameInput="Input" className="innerInput" placeholder="Filter by user tagged" />
            <button onClick={handleFilterOnlyByUserTagged}>Filter only by user taged</button>
            <div className="ErrorMsg"> {userNamesTagsValidator}</div>
        </div>
        <div className="filterByTags">
            <label>Filter by tags: (splited by ' '(space bar) )</label>
            <Input onChange={handleTags} classNameInput="Input" className="innerInput" placeholder="Filter by taggs" />
            <button onClick={handleFilterOnlyTaggs}>Filter only by tags</button>
            <div className="ErrorMsg"> {tagsValidator}</div>
        </div>
        <div className="filterByFriendGroups">
            <div>
                <label>Filter by friendGroups: </label>
            </div>
            <div className="innerFriendsGroupName">
                {renderFriendsGroupNames()}
            </div>
            <div className="ErrorMsg"> {groupNamesValidator}</div>
            <div>
                <button onClick={handleFilterByGroupNames}>Filter only by tags</button>
            </div>
        </div>
        <div className="filterButtons">
            <button onClick={handleFullSubmit}>Filter by all</button>
        </div>
    </div>)

}

export default Filter;