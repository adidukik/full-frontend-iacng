import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../demo/service/ProductService';
import { LayoutContext } from '../layout/context/layoutcontext';
import Link from 'next/link';
import { Demo } from '../types/types';
import { ChartData, ChartOptions } from 'chart.js';
import { TabMenu } from 'primereact/tabmenu';

import { Card } from 'primereact/card';
import './BigNumbers.css';

interface BigNumbersProps {
}

const items: MenuItem[] = [
  {label: 'сутки'},
  {label: 'месяц'},
  {label: 'год'},
];

const BigNumbers: React.FC<BigNumbersProps> = (props) => {
  const labels = [
    "Добыча нефти (тонн) план - 146125 факт 145000",
    "Добыча газа",
    "Производство нефтепродуктов",
    "Остаток НП (дни)",
    "Экспорт нефти %, нефтепродуктов %",
    "Цены на нефть, внутренний рынок - 40, на экспорт - 40 Бензин 92 РК - 203"
  ];

  return (
    <div className="card">
      <TabMenu model={items} />

      <ul>
        {labels.map
              (label => 
              <li key = {label}>
                <Button label={label} className="p-button-raised p-button-text"/>
              </li>)}
      </ul>
    </div>
    
  );
};

export default BigNumbers;
