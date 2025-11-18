import { useReducer } from 'react';

const intialState = { count: 0 }

const reducer = (state: typeof intialState, action: { type: string }) => {
    switch (action.type) {
        case 'increament':
            return { count: state.count + 1 };
        case 'decreament':
            return { count: state.count + 1 };
        default:
            throw new Error('State not changed');
    }
}

export const ReeducerHoook = () => {
    const [state, dispatch] = useReducer(reducer, intialState);
    const increament = () => {
        dispatch({ type: 'increament' });
    };
    return (
        <div className='container'>
            <div className='box'>
                <p>{state.count}</p>
                <button className='button' onClick={increament}>Increase</button>
                <button className="button" onClick={() => dispatch({ type: 'decreament' })}>Decrease</button>
                <button className="button" onClick={() => dispatch({ type: 'reset' })}>Reset</button>
            </div>
        </div>
    )
}


// The useReducer hook is an alternative to useState in React. It's particularly useful when:
// You have complex state logic.
// The next state depends on the previous one.
// You want to manage multiple related pieces of state together (like in forms or games).
// You want more predictable state transitions, similar to Redux.

//syntax:
// const [state, dispatch] = useReducer(reducer,initialState);
// state – current state value.
// dispatch – function to trigger state changes.
// reducer – a function that receives (state, action) and returns the new state.
// initialState – initial value for state.

// When to Use:
// Form handling (with multiple inputs)
// State logic shared across multiple components
// Game state, animation steps
// Managing API loading, success, and error states