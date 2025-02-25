import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);
    const inc = () => {
        setCount(prevCount => prevCount + 1);
    }
    const dec = () => {
        setCount(prevCount => prevCount - 1);
    }
    const reset = () => {
        setCount(prevCount => 0);
    }
    return (
        <>
            <h1>Counter:{count}</h1>
            <button onClick={() => inc()}>Increment</button>
            <button onClick={() => dec()} >Decrement</button>
            <button onClick={() => reset()}>Reset</button>
        </>
    );
}
export default Counter;