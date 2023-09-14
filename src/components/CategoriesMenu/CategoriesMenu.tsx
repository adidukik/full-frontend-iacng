// import React, { useState } from 'react';
// import { TabMenu } from 'primereact/tabmenu';
// import { MenuItem } from 'primereact/menuitem';
// import './CategoriesMenu.css';

// const CategoriesMenu = () => {
//     const items: MenuItem[] = [
//         {label: 'нефтегазовая отрасль'},
//         {label: 'электроэнергетика'},
//         {label: 'урановая промышленность'},
//     ];

//     return (
//         <div className="card">
//             <div className = "center">
//                 <TabMenu model={items} />
//             </div>
//         </div>
//     )
// }

// export default CategoriesMenu

// features/categories/CategoriesMenu.tsx

import React from "react";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCategory } from "./categoriesSlice";
import "./CategoriesMenu.css";
import { setBigNumberId, setBigNumberValue } from "../BigNumbers/bigNumbersSlice";
import { setCurrentCompanyId } from "../LoginPage/authSlice";

const firstBigNumbers: string[] = [
  "oil_yield",
  "energy_generation",
  "",
  "opec",
];

const CategoriesMenu = () => {
  const dispatch = useDispatch();
  const items = [
    "нефтегазовая отрасль",
    "электроэнергетика",
    "урановая промышленность",
    "ОПЕК+",
  ];

  const handleSelect = (selectedKey: string) => {
    const categoryIndex = items.indexOf(selectedKey);
    dispatch(setCategory(categoryIndex));
    dispatch(setBigNumberValue(0));
    dispatch(setBigNumberId(firstBigNumbers[categoryIndex]));
  };

  return (
    <div className="card-categories categories-menu">
      <Nav
        variant="tabs"
        defaultActiveKey="нефтегазовая отрасль"
        onSelect={handleSelect}
      >
        {items.map((item, idx) => (
          <Nav.Item key={idx}>
            <Nav.Link eventKey={item} className="categories-menu__category">
              {item}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default CategoriesMenu;
