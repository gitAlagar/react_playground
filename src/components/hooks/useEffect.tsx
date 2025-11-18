import { useState, useEffect } from 'react';
import '../../styles/hooks.css';

export const EffectHook = () => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        return () => {
            console.log("unmount", count);
        }
    }, [count]);

    const clickHandle = () => {
        setCount(count + 1);
    }

    // Logging render as a side effect (not in return)
    console.log("render");

    return (
        <>
            <div className='main-container'>
                <h1>useEffect</h1>
                <p>{count}</p>
                <button onClick={clickHandle}>Click</button>
            </div>
        </>
    );
}

// The useEffect hook takes two arguments:

// A function (the effect): This is where you put your side effect code.

// An optional dependency array: This array tells React when to re-run the effect.

// If the array is empty, the effect runs only once after the initial render.
// useEffect(() => {
//     setCount(count + 1);
// }, []);

// If the array contains variables, the effect runs whenever those variables change.
// useEffect(() => {
//     console.log("c", count);
//     return () => {
// The cleanup function is optional and runs before the component unmounts or before the effect runs again.//         console.log("unmount", count);
//     }
// }, [count]);

// If no array is provided, the effect runs after every render.
// useEffect(() => {
//         console.log("c",count);
//  },);


