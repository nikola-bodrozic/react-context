import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

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
  const [clientId, setClientId] = useState(null); // Store client ID

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");

    ws.onopen = () => console.log("WebSocket connected");

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "welcome") {
        setClientId(message.payload.clientId); // Save client ID
      }

      if (message.type === "position_update") {
        const { lat, lng, zoom } = message.payload;
        setPosition([lat, lng]);
        setZoom(zoom);
      }

      if (message.type === "movement_complete") {
        console.log("Pin has finished moving!");
      }
    };

    ws.onclose = () => console.log("WebSocket disconnected");

    return () => ws.close();
  }, []);

  return (
    <div className="card">
      <MapContainer
        center={position}
        zoom={zoom}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          {clientId && <Popup>Client ID: {clientId}</Popup>}
        </Marker>
        <UpdateMapZoom zoom={zoom} /> {/* Dynamically update zoom */}
      </MapContainer>
    </div>
  );
};

export default Map;