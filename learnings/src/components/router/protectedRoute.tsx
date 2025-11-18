import React from 'react';
import { useAuth } from './authcontext';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute: React.FC = () => {
    const { user } = useAuth();

    if (user === undefined) {
        return <h1>Loading...</h1>; // Prevents redirection glitches
    }

    return user ? <Outlet /> : <Navigate to='/login' replace />

}

// Read Me --------------------------

// <Outlet/> is a placeholder in nested routes. It renders the child route that's matched under parent <Route>

// The replace prop prevents the /dashboard (or protected route) from staying in the browser history
// so the Back button won’t bring the user back to the protected page.