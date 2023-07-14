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

import { Card } from 'primereact/card';
import './BigNumbers.css';

interface BigNumbersProps {
}

const BigNumbers: React.FC<BigNumbersProps> = (props) => {
  const labels = [
    "Добыча нефти",
    "Добыча газа",
    "Переработка нефти",
    "Биржевая цена"
  ];

  return (
    <Card title="Сводка" className='big-numbers'>
      <ul>
        {labels.map
              (label => 
              <li key = {label}>
                <Button label={label} className="p-button-info"/>
              </li>)}
      </ul>
    </Card>
    
  );
};

export default BigNumbers;
