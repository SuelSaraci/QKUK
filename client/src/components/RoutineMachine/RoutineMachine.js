import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "./RoutineMachine.css";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({ userLocation, userClinic }) => {
  const instance = L.Routing.control({
    createMarker: function (i, wp) {
      return L.marker(wp.latLng).bindPopup("I'm waypoint " + i);
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
