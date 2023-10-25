import Title from "../Title/Title";
import React from "react";
import BigNumbers from "../BigNumbers/BigNumbers";
import CategoriesMenu from "../CategoriesMenu/CategoriesMenu";
import ChatBot from "../ChatBot/ChatBot";
import Graph from "../Graph/Graph";
import AppMap from "../Map/AppMap";
import Regions from "../Regions/Regions";
import ScrollingText from "../ScrollingText/ScrollingText";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Category } from "../CategoriesMenu/categoriesSlice";
import OpecGraphCountry from "../OpecGraph/OpecGraphCountry";
import OpecGraphAll from "../OpecGraph/OpecGraphAll";
import OpecComponents from "../OpecGraph/OpecComponents";
import { setContractVisibility } from "../Map/mapSlice";
import { Button } from "@mui/material";
import("./PanelPage.css");

const DefaultComponents = () => {
  return (
    <>
      <div className="Regions">
        <Regions></Regions>
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
      <div className="ScrollingText">
        <ScrollingText />
      </div>
    </>
  );
};

const PanelPage = () => {
  const activeCategory: Category = useSelector(
    (state: RootState) => state.categories,
  );
  const contractVisibility = useSelector(
    (state: RootState) => state.map.contractVisibility,
  );
  const currentContractor = useSelector(
    (state: RootState) => state.map.currentContractor,
  );
  const dispatch = useDispatch();
  return (
    <div className="PanelPage">
      <div className="Title align-items-center d-flex w-100">
        <Title />
      </div>
      <div className="CategoriesMenu">
        <CategoriesMenu />
      </div>
      <div className="BigNumbers">
        <BigNumbers />
      </div>
      <div className={`contract_wrapper white-text ${contractVisibility ? "" : "hidden"}`}>
        <Button
        variant="contained"
          onClick={() => {
            dispatch(setContractVisibility(false));
          }}
        >
          Закрыть
        </Button>
        {
          currentContractor &&  <iframe
          src={`http://192.168.0.57:8001/search_asset/?name_to_search=${currentContractor}`}
          frameborder="0"
        ></iframe>
        }
       
      </div>
      {activeCategory === 3 ? <OpecComponents /> : <DefaultComponents />}
    </div>
  );
};

export default PanelPage;
