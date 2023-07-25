import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BigNumbers from "./components/BigNumbers/BigNumbers.tsx";
import AppMap from "./components/Map/AppMap.tsx";
import Graph from "./components/Graph/Graph.tsx";
import ChatBot from "./components/ChatBot/ChatBot.jsx";
import "primereact/resources/themes/lara-light-blue/theme.css";
import NavBar from "./components/NavBar/NavBar.tsx";
import Regions from "./components/Regions/Regions.tsx";
import CategoriesMenu from "./components/CategoriesMenu/CategoriesMenu.tsx";
import Title from "./components/Title/Title.tsx";
import ScrollingText from "./components/ScrollingText/ScrollingText.tsx";
import { useState } from "react";
import { Box } from "./components/Regions/Regions_card.tsx";

function App() {
  const [currentRegion, setCurrentRegion] = useState(null);

  return (
    <div className="App">
      <div className="Title align-items-center d-flex w-100">
        <Title />
      </div>
      <div className="CategoriesMenu">
        <CategoriesMenu />
      </div>
      <div className="BigNumbers">
        <BigNumbers />
      </div>
      <div className="Regions">
        {/* <Box></Box> */}
        <Regions onRegionClick={setCurrentRegion}></Regions>
        {/* <Regions /> When redux is implemented*/}
      </div>
      <div className="ScrollingText">
        <ScrollingText />
      </div>
      <div className="Map" style={{ background: "#e5e5e5" }}>
        <AppMap currentRegion={currentRegion} />
      </div>
      <div className="ChatBot">
        <ChatBot />
      </div>
      <div className="Graph">
        <Graph />
      </div>
    </div>
  );
}

export default App;
