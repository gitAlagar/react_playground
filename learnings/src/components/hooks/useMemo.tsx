import { useState, useMemo } from "react";

const slowFunction = (n: number) => {
  console.log("Computing...");
  return n * 2; // Simulating an expensive calculation
};

const ExpensiveCalculation = ({ num }: { num: number }) => {
console.log("alagar")
  const memoizedResult = useMemo(() => slowFunction(num), [num]);

  return <h2>Computed Value: {memoizedResult}</h2>;
};

const MemoHook = () => {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(5);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Re-render ({count})</button>
      <button onClick={() => setNum(num + 1)}>Change Num ({num})</button>
      <ExpensiveCalculation num={num} />
    </div>
  );
};

export default MemoHook;

// useMemo is a React hook that memoizes (caches) the result of a function 
// so that it doesn’t get recalculated on every render.

// Why do we need it?

// An expensive calculation (like filtering, sorting, looping 10,000 items).

// A parent re-rendering often (like a counter button).

// Without useMemo, the expensive function would run on every render, even when inputs haven’t changed → wasteful & slow.