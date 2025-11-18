import React from 'react';
import { useAuth } from './authcontext';
import {useNavigate} from 'react-router-dom';

export const Dashboard:React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout=()=>{
        logout();
        navigate('/login');
    }
    return (
        <>
            <h1>{user?.name}</h1>
            <button onClick={ handleLogout}>Logout</button>
        </>
    )
}