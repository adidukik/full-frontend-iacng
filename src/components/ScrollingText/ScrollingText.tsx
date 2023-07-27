import React, { useState, useEffect } from "react";
import Ticker, { FinancialTicker, NewsTicker } from "nice-react-ticker";
import "./ScrollingText.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Category } from "../CategoriesMenu/categoriesSlice";

const ScrollingText = () => {
  const activeCategory: Category = useSelector(
    (state: RootState) => state.categories,
  );
  let text;
  switch (activeCategory) {
    case 0:
      text =
        "ТШО 20.07 примерно в 23:00ч. (местное время) был произведена остановка 5-ой нитки КТЛ ввиду обнаружения сквозной трещины в пропановом трубопроводе У-700. Снижение суточной добычи нефти  с 80-58 тыс. тонн, до 69-71 тыс. тонн.";
      break;
    case 1:
      text =
        '13.06 в 12:47 по причине ложной работы защиты по пожарной безопасности отключился ГТ-9.2 с Р=70МВт на ГТЭС-242 ТШО, на ПС Индер работала АНМ Л-2540 на пуск САОН с Р=30 МВт (ТОО "Атырауэнергосату"- бытовые потребители) и на ПС Бейнеу работала АНМ Л-2075, Л-2085 на пуск САОН с Р=63 МВт (из них 43 МВт потребители АО "Озенмунайгаз" - промышленные потребители, 20 МВт ТОО "Мангыстау Жарык" - бытовые потребители). В 12:54 сняты ограничения Р=30МВт ТОО "Атырауэнергосату". В 13:00 сняты ограничения в объеме 20МВт - бытовые потребители (на ограничении осталось 43 МВт промышленные потребители АО "Озенмунайгаз"). В 13:09 на ГТЭС-242 ТШО включили в работу из резерва ГТ-6.4. 14.06 в 02:50 полностью сняты ограничения.';
      break;
    case 2:
      text = "";
      break;
    default:
      text = "";
  }
  return (
    <div className="card d-flex align-items-center">
      <marquee>
        <span className="scrollingText">{text}</span>
      </marquee>
    </div>
  );
};

export default ScrollingText;
