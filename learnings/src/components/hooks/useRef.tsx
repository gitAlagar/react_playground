import { useRef, useState, useEffect } from 'react';

export const RefHook = () => {
    const countRef = useRef<number>(0);
    const inputRef =useRef<HTMLInputElement>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        countRef.current = count;
        // Accessing Dom element directly using ref
        if(inputRef.current){
            inputRef.current.focus();
        }
    }, [count]);


    return (
        <div>
            <p>count : {count}</p>
            <p>ref : {countRef.current}</p>
            <input type='text' ref={inputRef}/>
            <button onClick={()=>setCount(count+1)}>count++</button>
        </div>
    )
};


// useRef is a React Hook that provides a way to interact with the DOM directly 
// or to store mutable values that persist across component re-renders without causing the component to re-render.
// const myRef = useRef(initialValue);
// myRef will be { current: initialValue }

// 1. Accessing DOM Elements:

// One of the most common use cases is to get a direct reference to a DOM element rendered by React. 
// This is useful for tasks that require direct DOM manipulation that React doesn't directly handle, such as:

// Focusing an input field.

// Playing or pausing media (video/audio).

// Triggering animations.

// Integrating with third-party DOM libraries.

// To do this, you pass the ref object returned by useRef to the ref attribute of a JSX element:

// 2. Persisting Mutable Values Across Renders (Without Triggering Re-renders):
// Storing a timer ID (e.g., from setInterval or setTimeout) to clear it later.

// Keeping track of a previous state or prop value for comparison.

// Storing any variable that you need to access and modify across renders, but whose changes shouldn't cause the UI to update.