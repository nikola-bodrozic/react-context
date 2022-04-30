import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = () => {
  const [data] = useContext(CartContext);
  return (
    <div className="card">
      <MapContainer
        className="markercluster-map"
        center={[51, 19]}
        zoom={4}
        maxZoom={18}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[52, 18]}>
          <Popup>
            <ul>
              {data.map((data) => (
                <li key={data.id}>{data.name}</li>
              ))}
            </ul>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
