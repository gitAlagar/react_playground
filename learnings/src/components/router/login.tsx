import { useNavigate } from 'react-router-dom';
import {useAuth} from './authcontext';

export const Login = () => {

    const{login}=useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        login();
        navigate('')
    }

    return (
        <>
            <h1>Login</h1>
            <button onClick={()=>navigate('./signup')}>SignUp</button>
            <button onClick={handleLogin}>Login</button>
        </>
    )
}