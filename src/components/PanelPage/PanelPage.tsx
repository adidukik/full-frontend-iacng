import Title from "../Title/Title";
import React from "react";
import BigNumbers from "../BigNumbers/BigNumbers";
import CategoriesMenu from "../CategoriesMenu/CategoriesMenu";
import ChatBot from "../ChatBot/ChatBot";
import Graph from "../Graph/Graph";
import AppMap from "../Map/AppMap";
import Regions from "../Regions/Regions";
import ScrollingText from "../ScrollingText/ScrollingText";

const PanelPage = () => {
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
        <Regions></Regions>
      </div>
      <div className="ScrollingText">
        <ScrollingText />
      </div>
      <div className="Map" style={{ background: "#e5e5e5" }}>
        <AppMap />
      </div>
      <div className="ChatBot">
        <ChatBot />
      </div>
      <div className="Graph">
        <Graph />
      </div>
    </div>
  );
};

export default PanelPage;
