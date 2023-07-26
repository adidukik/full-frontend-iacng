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

const CategoriesMenu = () => {
  const dispatch = useDispatch();
  const items = [
    "нефтегазовая отрасль",
    "электроэнергетика",
    "урановая промышленность",
  ];

  const handleSelect = (selectedKey: string) => {
    dispatch(setCategory(items.indexOf(selectedKey)));
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
