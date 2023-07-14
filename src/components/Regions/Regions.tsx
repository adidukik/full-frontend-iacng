import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import './Regions.css';
import { Button } from 'primereact/button';

const Regions = () => {
    const products = [
//         01	Астана
// 02	Алматы
// 03	Акмолинская область
// 04	Актюбинская область
// 05	Алматинская область
// 06	Атырауская область
// 07	Западно-Казахстанская область
// 08	Жамбылская область
// 09	Карагандинская область
// 10	Костанайская область
// 11	Кызылординская область
// 12	Мангистауская область
// 13	Южно-Казахстанская область
// 14	Павлодарская область
// 15	Северо-Казахстанская область
// 16	Восточно-Казахстанская область
        { code: <Button  onClick={()=>alert("You clicked on Astana")}>'Астана'</Button>, name: 'Product 1', category: 'Category 1', quantity: 10 },
        { code: <Button>'Алматы'</Button>, name: 'Product 2', category: 'Category 2', quantity: 20 },
        { code: <Button>Северо-Казахстанская область</Button>, name: 'Product 1', category: 'Category 1', quantity: 10 },
        { code: <Button>'Павлодарская область'</Button>, name: 'Product 2', category: 'Category 2', quantity: 20 },
    ];

    return (
        <Card title="Области" >
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="Code" sortable style={{ width: '25%' }}></Column>
                <Column field="name" header="Name" sortable style={{ width: '25%' }}></Column>
                <Column field="category" header="Category" sortable style={{ width: '25%' }}></Column>
                <Column field="quantity" header="Quantity" sortable style={{ width: '25%' }}></Column>
            </DataTable>

    </Card>
    );
};

export default Regions;