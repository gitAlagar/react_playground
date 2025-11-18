import React from 'react';
import {useState,useEffect,createContext,useRef} from 'react';
import '../styles/index.css';
import { Menu } from './hooks/menu';

export const User = createContext();

const Index = () => {
const[count,setCount]=useState(0);
const[input,setInput]=useState('');

const renderCount =useRef(0);

useEffect(()=>{
    
    renderCount.current=count;
    console.log("effect",renderCount.current)
},[count]);



const clickHandler=()=>{
    setCount(count+1);
}
    return (
        console.log("render",count),
        <>
            <div className='container'>
                <div className='box'>
                    <div className='buttonBox'>
                    <button type="button" onClick={clickHandler}>Click</button>
                    </div>
                    <div className='buttonBox'>
                        <input type="text" onChange={(e)=>setInput(e.target.value)}></input>
                    </div>
                    {/* <User.Provider value={count}>
                    <Menu bet={count}/>
                    </User.Provider> */}
                    
                </div>
            </div>
        </>
    )
}

export default Index;