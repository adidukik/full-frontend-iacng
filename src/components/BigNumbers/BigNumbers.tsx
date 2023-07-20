// import { Button } from 'primereact/button';
// import { Chart } from 'primereact/chart';
// import { Column } from 'primereact/column';
// import { DataTable } from 'primereact/datatable';
// import { Menu } from 'primereact/menu';
// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { TabMenu } from 'primereact/tabmenu';

// import { Card } from 'primereact/card';
// import './BigNumbers.css';

// interface BigNumbersProps {
// }

// const items: MenuItem[] = [
//   {label: 'сутки'},
//   {label: 'месяц'},
//   {label: 'год'},
// ];

// const BigNumbers: React.FC<BigNumbersProps> = (props) => {
//   const labels = [
//     "Добыча нефти (тонн) план - 146125 факт 145000",
//     "Добыча газа",
//     "Производство нефтепродуктов",
//     "Остаток НП (дни)",
//     "Экспорт нефти %, нефтепродуктов %",
//     "Цены на нефть, внутренний рынок - 40, на экспорт - 40 Бензин 92 РК - 203"
//   ];

//   return (
//     <div className="card">
//       <TabMenu model={items} className="time-tabmenuitem"/>

//       <ul>
//         {labels.map
//               (label => 
//               <li key = {label}>
//                 <Button label={label} className="p-button-raised p-button-text"/>
//               </li>)}
//       </ul>
//     </div>
    
//   );
// };

// export default BigNumbers;


import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Button, Card, Nav } from 'react-bootstrap';
import './BigNumbers.css';

interface BigNumbersProps {
}

const BigNumbers: React.FC<BigNumbersProps> = (props) => {
  const items = ['сутки', 'месяц', 'год'];

  const activeCategory = useSelector((state: RootState) => state.categories);

  const labels = getLabelsForCategory(activeCategory);  // Implement this function to return labels based on category

  return (
    <Card className="big-numbers app-card">
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#сутки">
          {items.map((item, idx) => (
            <Nav.Item key={idx}>
              <Nav.Link href={`#${item}`}>{item}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Card.Header>
      <Card.Body>
        <ul>
          {labels.map(label => 
            <li key={label}>
              <Button variant="outline-primary" className='big-numbers__btn'>{label}</Button>
            </li>)}
        </ul>
      </Card.Body>
    </Card>
  );
};

// Implement this function to return different labels based on category
function getLabelsForCategory(category: string) {
  switch (category) {
    case 'нефтегазовая отрасль':
      return ["Добыча нефти (тонн) план - 146125 факт 145000",
      "Добыча газа",
      "Производство нефтепродуктов",
      "Остаток НП (дни)",
      "Экспорт нефти %, нефтепродуктов %",
      "Цены на нефть, внутренний рынок - 40, на экспорт - 40 Бензин 92 РК - 203"];
    case 'электроэнергетика':
      return ["Производство электроэнергии план - 146125 факт 145000"];
    case 'урановая промышленность':
      return [/*лейблы для урановой промышленности*/];
    default:
      return [];
  }
}

export default BigNumbers;
