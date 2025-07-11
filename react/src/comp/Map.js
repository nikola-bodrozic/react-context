import React, { useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { UserContext } from "../context/UsersContext";

// Helper component to update zoom
const UpdateMapZoom = ({ zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setZoom(zoom);
  }, [zoom]);
  return null;
};

const Map = () => {
  const [position, setPosition] = useState([52.2297, 21.0122]);
  const [zoom, setZoom] = useState(13); // Initial zoom
  const [data] = useContext(UserContext);

  return (
    <div className="card">
      <MapContainer
        center={position}
        zoom={zoom}
        style={{ height: "30vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <ul>
              {data.map((data) => (
                <li key={data.id}>{data.name}</li>
              ))}
            </ul>
          </Popup>
        </Marker>
        <UpdateMapZoom zoom={zoom} /> {/* Dynamically update zoom */}
      </MapContainer>
    </div>
  );
};

export default Map;
