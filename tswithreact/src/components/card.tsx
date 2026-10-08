interface CardProps  {
  name: string;
  price: string | number;
  isAvailable?: boolean;
};

export function Card({name, price,isAvailable = false}: CardProps){

    return(
        <article>
            <h2>{name} {isAvailable && <span>⭐</span>}</h2>
            <p>{price}</p>
        </article>
    )
}