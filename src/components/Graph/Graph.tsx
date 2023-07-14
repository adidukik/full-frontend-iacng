import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';

const Graph = () => {

    return (
        <Card title="График" >
        <Skeleton width="23rem" height="10rem"></Skeleton>  
    </Card>
    );
};

export default Graph;