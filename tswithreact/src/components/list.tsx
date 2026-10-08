import type { seat } from '../types'

import { Card } from './card';
interface ListProps {
    seats: seat[];
}

export function List({seats}: ListProps) {
    return (<div>
        <ul>
            {seats.map(seat => (
                <Card key={seat.id}
                name={seat.name}
                price={seat.price}
                isAvailable={seat.price >400}/>
            ))}
        </ul>
        </div>
    )
}
export default List