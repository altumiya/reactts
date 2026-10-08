import { useState } from 'react'

export function Counter() {
    const [count, setCount] = useState<number>(0)

    return(
        <div>
            <p>Counter : {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    )
}