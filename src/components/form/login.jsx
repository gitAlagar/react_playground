import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

// schema
const schema = z.object({
    email: z.string().min(1,'Email is required').email("invalid email format"),
    password: z
        .string()
        .min(1,'Password is required')
        .min(6, 'Password must be at least 6 characters')
        .regex(/[A-Za-z]/, "Password must include at least one letter")
        .regex(/\d/, 'Password must include one number'),
});

export const Login = () => {

    //  useForm
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    // useState
    const [serverError, setServerError] = useState("");

    //useNavigate
    const navigate = useNavigate();

    // validations
    const onSubmit = async (data) => {
        console.log("Alagar")
        try {
            const response = await axios.get(`http://localhost:5000/users?email=${data.email}`);

            if (response.data) {
                navigate('/signup');
            } else {
                setServerError('Invalide email or password')
            }
        }
        catch {
            setServerError('Server error please try again later');
        }


    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email : </label>
                    <input {...register("email",{reuired:'email is required'})} />
                    <p>{errors.email?.message}</p>
                </div>
                <div>
                    <label>Password : </label>
                    <input {...register("password")} />
                    <p>{errors.password?.message}</p>
                </div>
                <button type='submit'>Login</button>
            </form>

        </div>
    )
}