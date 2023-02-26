import "./App.css";
import Map from "./components/Map/Map";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faExpand,
  faCompress,
  faMagnifyingGlass,
  faStreetView,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faExpand,
  faCompress,
  faMagnifyingGlass,
  faStreetView,
  faLocationDot
);

function App() {
  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
