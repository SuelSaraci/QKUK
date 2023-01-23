import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

function Map() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let storedLocation = JSON.parse(localStorage.getItem("location"));
    if (storedLocation) {
      setLocation(storedLocation);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (cords) => {
            let newLocation = [cords.coords.latitude, cords.coords.longitude];
            setLocation(newLocation);
            localStorage.setItem("location", JSON.stringify(newLocation));
          },
          function () {
            alert("Could not get your position");
          }
        );
      }
    }
  }, []);

  return (
    <div id="map">
      {location && (
        <MapContainer
          center={location}
          zoom={13}
          scrollWheelZoom={true}
          zoomSnap={0.5}
          zoomDelta={0.5}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location}></Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default Map;
