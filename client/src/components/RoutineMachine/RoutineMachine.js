import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "./RoutineMachine.css";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({
  userLocation,
  userClinic,
  popupClinicData,
}) => {
  const instance = L.Routing.control({
    createMarker: function (i, wp) {
      const marker = L.marker(wp.latLng);
      if (wp.latLng.equals(userClinic)) {
        const popupContent = `
          <div class="custom-popup">
            <img src="${popupClinicData.popup_image}" alt="Clinic Image" />
            <p>Klinika e ${popupClinicData.name}</p>
          </div>
        `;
        marker.bindPopup(popupContent);
      }
      return marker;
    },
    waypoints: [L.latLng(userLocation), L.latLng(userClinic)],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
