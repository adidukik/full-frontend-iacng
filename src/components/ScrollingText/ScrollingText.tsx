import React, { useState, useEffect } from "react";
import Ticker, { FinancialTicker, NewsTicker } from "nice-react-ticker";
import "./ScrollingText.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Category } from "../CategoriesMenu/categoriesSlice";

const ScrollingText = () => {
  const activeCategory: Category = useSelector(
    (state: RootState) => state.categories
  );
  const currentCountry = useSelector(
    (state: RootState) => state.opec.currentCountry
  );
  let text;
  switch (activeCategory) {
    case 0:
      text =
        "ТШО 20.07 примерно в 23:00ч. (местное время) был произведена остановка 5-ой нитки КТЛ ввиду обнаружения сквозной трещины в пропановом трубопроводе У-700. Снижение суточной добычи нефти  с 80-85 тыс. тонн, до 69-71 тыс. тонн.";
      break;
    case 1:
      text =
        " ЕЭС Казахстана работает параллельно с ЕЭС России и ОЭС Центральной Азии.";
      break;
    case 2:
      text = "";
      break;
    default:
      text = "";
  }
  if(activeCategory === 3) return <div className="text-light">{currentCountry}</div>;
    
  return (
        <div className="card d-flex align-items-center">
      
        <marquee>
          <span className="scrollingText">{text}</span>
        </marquee>
    
    </div>
  );
};

export default ScrollingText;
