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
import { BrowserRouter } from "react-router-dom";
import { PagesRouter } from "./routes/PagesRouter.tsx";

function App() {
  return (
    <BrowserRouter>
      <PagesRouter />
    </BrowserRouter>
  );
}

export default App;
