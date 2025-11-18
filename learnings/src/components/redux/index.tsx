import { legacy_createStore as createStore, type Store } from 'redux';
import { useSyncExternalStore } from 'react';
import React from 'react';

interface CounterState {
    count: number;
}

type CounterAction = | { type: "increment" } | { type: "decrement" } | { type: "reset" };

const initialState: CounterState = { count: 0 };

const reducer = (state: CounterState = initialState, action: CounterAction): CounterState => {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        case "reset":
            return { count: 0 };
        default:
            return state;
    }
}

const store: Store<CounterState, CounterAction> = createStore(reducer);

export const reduxCounter: React.FC = () => {

    // const[count,setCount]=useState<number>(store.getState().count);

    // useEffect(()=>{
    //     const unsubscribe=store.subscribe(()=>{
    //         setCount(store.getState().count);
    //     })
    // },[]);

    const count = useSyncExternalStore(
        store.subscribe,
        () => store.getState().count
    )

return (
    <div>
        <h1>{count}</h1>
        <button onClick={() => store.dispatch({ type: "increment" })}>Increment</button>
        <button onClick={() => store.dispatch({ type: "decrement" })}>Decrement</button>
        <button onClick={() => store.dispatch({ type: "reset" })}>Reset</button>
    </div>
)
};