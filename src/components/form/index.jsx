import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './login';
import { SignUp } from './signup';

export const LoginIndex = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='signup' element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
