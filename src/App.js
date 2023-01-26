import "./App.css";
import Map from "./components/Map/Map";
import Sidebar from "./components/Sidebar/Sidebar";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faExpand,
  faCompress,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

library.add(faExpand, faCompress, faMagnifyingGlass);

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Map />
    </div>
  );
}

export default App;
