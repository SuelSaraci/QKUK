import React, { useEffect, useRef, useState, useCallback } from "react";
import { MapContainer, TileLayer, FeatureGroup, Marker } from "react-leaflet";
import FullscreenButton from "../ExpandButton/ExpandButton";
import RoutineMachine from "../RoutineMachine/RoutineMachine";
import { EditControl } from "react-leaflet-draw";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "../Sidebar/Sidebar";
import "leaflet-draw/dist/leaflet.draw.css";

import "./Map.css";

function Map() {
  const [location, setLocation] = useState([42.711778, 20.823036]);
  const [routeTableHidden, setRouteTableHidden] = useState(false);
  const [markerPosition, setMarkerPosition] = useState();
  const [popupClinicData, setPopupClinicData] = useState("");

  const mapRef = useRef();
  const maxBounds = [
    [42.22, 20.27],
    [43.28, 21.78],
  ];

  useEffect(() => {
    setTimeout(() => {
      const routeTable = document.querySelector(".leaflet-routing-container");
      if (routeTable) {
        routeTable.classList.add("hidden");
      }
    }, 0);
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (cords) => {
          let newLocation = [cords.coords.latitude, cords.coords.longitude];
          setLocation(newLocation);
          setRouteTableHidden(true);
        },
        function () {
          alert(
            "If you want to follow the directions from your location please enable it"
          );
        }
      );
    }
  };

  const handleTableShow = () => {
    const routeTable = document.querySelector(".leaflet-routing-container");
    routeTable.classList.toggle("hidden");
  };

  const Route = useCallback(() => {
    return (
      <RoutineMachine
        userLocation={location}
        userClinic={markerPosition}
        popupClinicData={popupClinicData}
      />
    );
  }, [location, markerPosition, popupClinicData]);

  const handleShapeDrawn = (e) => {
    const geojson = e.layer.toGeoJSON();
    const featureType = geojson.geometry.type;

    if (featureType === "Point") {
      const name = prompt("Enter name of the feature:");
      if (name) {
        geojson.properties = { name };

        fetch("http://localhost:3300/clinics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            geom: geojson.geometry,
          }),
        }).then((response) => {
          return response.text();
        });
      } else {
        // User cancelled the prompt dialog
        e.layer.remove();
      }
    }
  };

  function handleSearchResultClick(data) {
    const newMarkerPosition = data.geom.coordinates.reverse();
    setPopupClinicData(data);
    setMarkerPosition(newMarkerPosition);
    mapRef.current.setView(newMarkerPosition); // this line centers the map to the new marker position
  }

  useEffect(() => {
    // Update the marker position when location changes
    setMarkerPosition(markerPosition);
  }, [location]);

  return (
    <>
      <Sidebar onSearchResultClick={handleSearchResultClick} />
      <div id="map">
        <MapContainer
          ref={mapRef}
          center={location}
          zoom={9}
          scrollWheelZoom={true}
          zoomSnap={0.5}
          zoomDelta={0.5}
          minZoom={9}
          maxBounds={maxBounds}
        >
          <div className="fullscreen-button">
            <FullscreenButton />
          </div>
          <div className="location-button">
            <button onClick={getUserLocation}>
              <span>
                <FontAwesomeIcon icon="fa-location-dot" />
              </span>
            </button>
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
          {!routeTableHidden
            ? markerPosition && <Marker position={markerPosition} />
            : null}
          {routeTableHidden && <Route />}
          <FeatureGroup>
            <EditControl
              position="bottomleft"
              onCreated={handleShapeDrawn}
              draw={{
                marker: true,
                circle: true,
                circlemarker: true,
                polyline: true,
                rectangle: true,
                polygon: {
                  allowIntersection: true,
                  drawError: {
                    color: "#e1e100",
                    message: "Ooops!",
                  },
                  shapeOptions: {
                    color: "#97009c",
                  },
                },
              }}
            />
          </FeatureGroup>
        </MapContainer>
      </div>
    </>
  );
}

export default Map;
