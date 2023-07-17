import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';

const CategoriesMenu = () => {
    const items: MenuItem[] = [
        {label: 'нефтегазовая отрасль', icon: 'pi pi-fw pi-home'},
        {label: 'электроэнергетика', icon: 'pi pi-fw pi-calendar'},
        {label: 'урановая промышленность', icon: 'pi pi-fw pi-pencil'},
    ];

    return (
        <div className="card">
            <TabMenu model={items} />
        </div>
    )
}

export default CategoriesMenu