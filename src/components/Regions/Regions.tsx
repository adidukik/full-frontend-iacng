import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import './Regions.css'

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
        { code: 'Астана', name: 'Product 1', category: 'Category 1', quantity: 10 },
        { code: 'Алматы', name: 'Product 2', category: 'Category 2', quantity: 20 },
        { code: 'Акмолинская область', name: 'Product 1', category: 'Category 1', quantity: 10 },
        { code: 'Алматинская область', name: 'Product 2', category: 'Category 2', quantity: 20 },
        { code: 'A001', name: 'Product 1', category: 'Category 1', quantity: 10 },
        { code: 'A002', name: 'Product 2', category: 'Category 2', quantity: 20 },
        { code: 'A001', name: 'Product 1', category: 'Category 1', quantity: 10 },
        { code: 'A002', name: 'Product 2', category: 'Category 2', quantity: 20 },
        { code: 'A001', name: 'Product 1', category: 'Category 1', quantity: 10 },
        { code: 'A002', name: 'Product 2', category: 'Category 2', quantity: 20 },
        { code: 'A001', name: 'Product 1', category: 'Category 1', quantity: 10 },
        { code: 'A002', name: 'Product 2', category: 'Category 2', quantity: 20 },
        { code: 'A001', name: 'Product 1', category: 'Category 1', quantity: 10 },
        { code: 'A002', name: 'Product 2', category: 'Category 2', quantity: 20 },
        { code: 'A001', name: 'Product 1', category: 'Category 1', quantity: 10 },
        { code: 'A002', name: 'Product 2', category: 'Category 2', quantity: 20 },
        { code: 'A001', name: 'Product 1', category: 'Category 1', quantity: 10 },
        { code: 'A002', name: 'Product 2', category: 'Category 2', quantity: 20 },
    ];

    return (
        <Card title="Области" >
         <table>
            <thead>
                <tr>
                    <th>
                        <Button label="Область" severity="secondary" />
                    </th>
              
                    <th>
                        <Button label="Показатель 1" severity="secondary" />
                    </th>
              
                    <th>
                        <Button label="Показатель 2" severity="secondary" />
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <Button label="Астана"/>
                    </td>
                    <td>
                        1234
                    </td>
                    <td>
                        3232
                    </td>
                </tr>
                <tr>
                    <td>
                        <Button label="Павлодарская область"/>
                    </td>
                    <td>
                        1234
                    </td>
                    <td>
                        3232
                    </td>
                </tr>
                <tr>
                    <td>
                        <Button label="Северо-Казахстанская область"/>
                    </td>
                    <td>
                        1234
                    </td>
                    <td>
                        3232
                    </td>
                </tr>
            </tbody>
         </table>
    </Card>
    );
};

export default Regions;