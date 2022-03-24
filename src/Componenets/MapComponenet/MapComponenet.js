import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "./MapComponenet.css"
// const 0.04

const MapComponenet = (props) => {
    const [myPosition, setMyPosition] = useState();
    const [locationClicked, setLocationClicked] = useState();
    const [map, setMap] = useState();

    useEffect(() => {
        goToMyPosition();
        console.log(map);
    }, [])

    const goToMyPosition = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            let ChangeLocation = [position.coords.latitude, position.coords.longitude];
            setMyPosition(ChangeLocation);
            if (map)
                map.flyTo(ChangeLocation, map.getZoom())
        });
    }

    return (<div className="MapComponent">
        <button onClick={goToMyPosition}>Go to my position</button>
        {myPosition ?
            <MapContainer center={myPosition} zoom={13} scrollWheelZoom={true}
                whenCreated={(map) => setMap(map)}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={myPosition}>

                </Marker>
            </MapContainer> : <></>}
    </div>)
}
export default MapComponenet;