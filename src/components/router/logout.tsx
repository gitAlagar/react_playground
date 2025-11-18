import React from 'react';
import { useAuth } from './authcontext';

export const Logout: React.FC = () => {
    const { user, logout } = useAuth();
    return (
        <>
            <h1>{user?.name}</h1>
            <button onClick={() => logout}></button>
        </>
    )
}