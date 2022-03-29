import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../Context/SocketProvider";
import "./MapComponenet.css";
import { addPost } from "../../Redux/GetPostsAction";
import PostMarker from "../PostMarker/PostMarker";
// const 0.04

const MapComponenet = (props) => {
    const [myPosition, setMyPosition] = useState();
    const [map, setMap] = useState();
    const socket = useSocket();
    const dispatch = useDispatch();
    const { postIsLoading, posts, postErrorMessage } = useSelector(state => state.Posts.userReducer);

    const handleMap = (map) => {
        setMap(map);
        props.setMap(map);
    }
    useEffect(() => {
        goToMyPosition();
        if (socket)
            socket.on('FriendPosted', (post) => {
                console.log(post);
                dispatch(addPost(post));
            })
    }, [socket])

    const goToMyPosition = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            let ChangeLocation = [position.coords.latitude, position.coords.longitude];
            setMyPosition(ChangeLocation);
            if (map)
                map.flyTo(ChangeLocation, map.getZoom())
        });
    }
    const goToMarker = () => {
        if (map)
            map.flyTo([32.833536, 35.4025472], map.getZoom())
    }

    const handleChange = () => {
        props.change();
    }

    const renderMarkers = () => {
        if (!posts) return <></>
        let index = -1;
        return posts.map((post) => {
            index++;
            let location = [post.location[0] + (index / 100), post.location[1] + (index / 100)]
            return (<Marker position={location} key={index} >
                <Popup>
                    <PostMarker post={post} />
                </Popup>
            </Marker>)
        });
    }


    return (<div className="MapComponent">
        <div className="MapButtons">
            <button onClick={goToMyPosition}>Go to my position</button>
            <button onClick={goToMarker}>Go to mark</button>
            <button onClick={handleChange} >Show feed insted </button>
        </div>
        {myPosition ?
            <MapContainer center={myPosition} zoom={13} scrollWheelZoom={true}
                whenCreated={(map) => handleMap(map)}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {posts ?
                    <Marker position={posts[4].location} key={-1} >
                        <Popup>
                            <PostMarker post={posts[4]} />
                        </Popup>
                    </Marker>
                    : <></>
                }
                {renderMarkers()}

            </MapContainer> : <></>}
    </div>)
}
export default MapComponenet;