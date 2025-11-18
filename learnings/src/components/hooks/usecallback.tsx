import { useState, useCallback } from 'react';
import { Todo } from './todos';

export const CallbackHook = () => {
    const [count, setCount] = useState(0);
    const [todos, setTodos] = useState<string[]>([]);

    const increament = () => {
        setCount((c) => c + 1);
    };

    const addTodo = useCallback(() => {
        setTodos((t) => [...t, 'New Todo']);
        console.log("Alagar--", todos)
    }, [todos]);

    // const addTodo = () => {
    //     setTodos((t) => [...t, 'New Todo']);
    //     console.log("Alagar--", todos)
    // };

    return (
        <div className='container'>
            <div className='box'>
                <p>{count}</p>
                <Todo todo={todos} addTodo={addTodo} />
                <button className='button' onClick={increament}>Increase</button>
            </div>
        </div>
    )
}


// The React useCallback Hook returns a memoized callback function.
// The useCallback Hook only runs when one of its dependencies update.

// In functional React components, every time the component re-renders,
// all functions defined within that component are recreated.
// This means their memory reference changes. useCallback helps to "memoize" or "cache" a function,
// so that React can reuse the same function instance across re-renders,
// as long as its dependencies haven't changed.

// If any of these dependencies change between renders, useCallback will return a new instance of the function.
// If they remain the same, it will return the previously cached function instance.

// Optimizing useEffect and useMemo Dependencies:
// If a function is a dependency in a useEffect or useMemo hook, useCallback can prevent these hooks from 
// re-running unnecessarily. If the function's reference changes on every render, 
// useEffect or useMemo will trigger even if the actual logic or state it relies on hasn't changed.