import { Button } from 'primereact/button';
import { TabMenu } from 'primereact/tabmenu';
import React, { useState } from 'react'

const CategoriesMenu = () => {
    const [activeIndex, setActiveIndex] = useState(3);
    const items = [
        {label: 'нефтегазовая отрасль', icon: 'pi pi-fw pi-home'},
        {label: 'Электроэнергетика', icon: 'pi pi-fw pi-calendar'},
        {label: 'урановая промышленность', icon: 'pi pi-fw pi-pencil'},
    ];

    return (
        <div className="card">
            <Button onClick={() => setActiveIndex(0)} className="p-button-outlined mb-5" label="Activate 1st" />
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => {
                setActiveIndex(e.index);
                console.log(e.index);
                }} />
        </div>
    )
}

export default CategoriesMenu