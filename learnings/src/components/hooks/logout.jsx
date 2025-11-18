import React from 'react';
import { useContext } from 'react';
import { User } from '..';



export const Logout = () => {
    const data=useContext(User);
    return(
        console.log("Alagar logout",data),
        <div>

        </div>
    )
}