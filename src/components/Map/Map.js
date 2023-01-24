import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import FullscreenButton from "./ExpandButton";
import "./Map.css";

function Map() {
  const [location, setLocation] = useState(null);
  const mapRef = useRef();

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

  useEffect(() => {
    if (location) {
      console.log(location);
      setTimeout(() => {
        console.log(mapRef.current);
        mapRef.current.flyTo(location, 17, {
          animate: true,
          duration: 2,
        });
      }, 500);
    }
  }, [location]);

  return (
    <div id="map">
      {location && (
        <MapContainer
          ref={mapRef}
          center={location}
          zoom={13}
          scrollWheelZoom={true}
          zoomSnap={0.5}
          zoomDelta={0.5}
        >
          <div className="fullscreen-button">
            <FullscreenButton />
          </div>
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
