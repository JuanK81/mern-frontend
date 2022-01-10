import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "./Map.css";



//lat: 39.56739530702399,
//lng: 2.6482925241340376,
// https://blog.logrocket.com/react-leaflet-tutorial/
// https://react-leaflet.js.org/docs/example-react-control/

const Map = (props) => {
    
  return (
    <div
      className={`leaflet-container map ${props.className}`}
      style={props.style}
    >
      <MapContainer
        style={{ height: 320, width: 625 }}
        center={[props.lat, props.lng]}
        zoom={props.zoom}
        // zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[props.lat, props.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
