import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';

const CategoriesMenu = () => {
    // const [activeIndex, setActiveIndex] = useState(3);
    // const items = [
    //     {label: 'нефтегазовая отрасль', icon: 'pi pi-fw pi-home'},
    //     {label: 'Электроэнергетика', icon: 'pi pi-fw pi-calendar'},
    //     {label: 'урановая промышленность', icon: 'pi pi-fw pi-pencil'},
    // ];

    // return (
    //     <div className="card">
    //         <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => {
    //             setActiveIndex(e.index);
    //             console.log(e.index);
    //             }} />
    //     </div>
    // )
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