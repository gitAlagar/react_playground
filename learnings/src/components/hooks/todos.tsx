import React from 'react';

type TodoProps={
    todo:string[];
    addTodo:()=>void;
}
export const Todo = React.memo(({ todo, addTodo }:TodoProps)=> {
    return (
        console.log("Alagar", todo),
        <div>
            {
                todo.map((value, index) => {
                    return <p key={index}>{value}</p>
                })
            }
            <button className='button' type='button' onClick={addTodo}>AddTodos</button>
        </div>
    )
});

//Using memo will cause React to skip rendering a component if its props have not changed.

//React.memo is a Higher-Order Component (HOC) in React that you can use to optimize the rendering performance
//  of your functional components. It's a tool for memoization, which is a caching technique.