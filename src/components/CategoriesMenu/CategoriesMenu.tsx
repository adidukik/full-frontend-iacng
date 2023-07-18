import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';

const CategoriesMenu = () => {
    const items: MenuItem[] = [
        {label: 'нефтегазовая отрасль'},
        {label: 'электроэнергетика'},
        {label: 'урановая промышленность'},
    ];

    return (
        <div className="card">
            <div className = "center">
            <TabMenu model={items} />
            </div>
        </div>
    )
}

export default CategoriesMenu