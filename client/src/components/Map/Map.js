import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import FullscreenButton from "../ExpandButton/ExpandButton";
import RoutineMachine from "../RoutineMachine/RoutineMachine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Map.css";

function Map() {
  const [location, setLocation] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      const routeTable = document.querySelector(".leaflet-routing-container");
      routeTable.classList.add("hidden");
    }, 0);
  }, []);

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
      setTimeout(() => {
        mapRef.current.flyTo(location, 15, {
          animate: true,
          duration: 2,
        });
      }, 500);
    }
  }, []);

  const handleTableShow = () => {
    const routeTable = document.querySelector(".leaflet-routing-container");
    routeTable.classList.toggle("hidden");
  };

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
          <div className="routing-button">
            <button onClick={handleTableShow}>
              <span>
                <FontAwesomeIcon icon="fa-street-view" />
              </span>
            </button>
          </div>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RoutineMachine userLocation={location} />
        </MapContainer>
      )}
    </div>
  );
}

export default Map;
