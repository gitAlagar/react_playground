import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

interface LocationState {
    location?: string;
}

export const Profile: React.FC = () => {
    const { username } = useParams<{username?:string}>();

    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const name = searchParams.get('name');
    const age = searchParams.get('age');
    // const { location: city } = location.state || {};
    const state = location.state as LocationState | null;
    const city = state?.location;

    return (
        <>
            <h1>Profile</h1>
            <p>Username: {username || 'N/A'}</p>
            <p>Name : {name||'N/A'}</p>
            <p>Age : {age||'N/A'}</p>
            <p>Location : {city || 'unkown'}</p>
        </>
    )
}