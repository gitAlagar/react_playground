import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import type { FC } from 'react';
import { ProtectedRoute } from './protectedRoute.js';
import { AuthProvider } from './authcontext.js';

const Home = lazy(() => import('./home').then(module => ({ default: module.Home })));
const Login = lazy(() => import('./login').then(module => ({ default: module.Login })));
const SignUp = lazy(() => import('./signup').then(module => ({ default: module.SignUp })));
const Profile = lazy(() => import('./profile').then(module => ({ default: module.Profile })));
const Dashboard = lazy(() => import('./dashboard.js').then(moduel => ({ default: moduel.Dashboard })));
export const RouterIndex: FC = () => {
    return (

        <AuthProvider>
            <Suspense fallback={<div className='spinner' >Loading...</div>}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='Login' element={<Login />} />
                    <Route path='signup' element={<SignUp />} />
                    <Route path='profile' element={<Profile />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path='dashboard' element={<Dashboard />} />
                    </Route>
                </Routes>
            </Suspense>
        </AuthProvider>
    );
}