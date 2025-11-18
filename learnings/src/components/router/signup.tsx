import React from 'react';
import {useNavigate} from 'react-router-dom';

export const SignUp:React.FC=()=>{
    const navigate=useNavigate();
    return(
        <>
        <h1>Sign-Up</h1>
        <button className='button' onClick={()=>navigate('./login')}>Logout</button>
        </>
    )
}