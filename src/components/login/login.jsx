import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
// import './Style.css'

const schema = z.object({
    email: z.string().min(1, 'email is required').email('invalid email formate'),
    password: z.string().min(1, 'password is required')
        .min(6, 'password must be at least 6 characters')
        .regex(/[A-Za-z]/, 'Password must include at least one letter')
        .regex(/\d/, 'Password must include one number')
});

export const Login = () => {


    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

    const [serverError, setServerError] = useState('');

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`http://localhost:5000/users?email=${data.email}`);

            const json = await response.json();
            if (json.length > 0) {
                navigate('/signup');
            } else {
                setServerError('User not found');
            }
        } catch {
            setServerError("Server error please try again later")
        }
    };

    return (
        <div className='container'>
            <div className='login-container'>
                <h1>Login</h1>
                <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                    <div className='input-group'>
                        <label>Email</label>
                        <input type='email' name='email' {...register('email')} />
                        {errors.email&&<p className='errors'>{errors.email?.message}</p>}
                    </div>

                    <div className='input-group'>
                        <label>Password</label>
                        <input type='password' name='password' {...register('password')} />
                        {errors.password&&<p className='errors'>{errors.password?.message}</p>}
                    </div>
                    {serverError&&<p className="errors">{serverError}</p>}
                    <button >Login</button>
                </form>
                <p className='link'>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    )
}