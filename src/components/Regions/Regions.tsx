import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import './Regions.css';
import { Button } from 'primereact/button';

export const regionNames = ['Абайская область', 'Акмолинская область', 'Актюбинская область', 'Алматинская область', 'Алматы', 'Астана', 'Атырауская область', 'Восточно-Казахстанская область', 'Жамбылская область', 'Жетысуская область', 'Западно-Казахстанская область', 'Карагандинская область', 'Костанайская область', 'Кызылординская область', 'Мангистауская область', 'Павлодарская область', 'Северо-Казахстанская область', 'Туркестанская область', 'Улытауская область', 'Шымкент'];

interface RegionsProps{
    onRegionClick: (el)=>void;
}
const Regions = ({onRegionClick}: RegionsProps) => {
    
    const products = regionNames.map(el => 
        {return { 
            code: <Button className="p-button-outlined p-button-text" onClick={()=>onRegionClick(el)}>{el}</Button>, 
            name: 'Product 1', 
            category: 'Category 1', 
            quantity: 10,
        }}
        )
       
 

    return (
            <DataTable value={products} className='Regions__table'>
                <Column field="code" header="Code" sortable style={{ width: '25%' }}></Column>
                <Column field="name" header="Name" sortable style={{ width: '25%' }}></Column>
                <Column field="category" header="Category" sortable style={{ width: '25%' }}></Column>
                <Column field="quantity" header="Quantity" sortable style={{ width: '25%' }}></Column>
            </DataTable>


    );
};

export default Regions;