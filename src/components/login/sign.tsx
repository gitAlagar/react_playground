import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';

// ✅ Zod schema for validation
const schema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z
      .string() 
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Za-z]/, 'Password must contain at least one letter')
      .regex(/\d/, 'Password must include one number'),
    confirmpassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: 'Passwords do not match',
    path: ['confirmpassword'],
  });

// ✅ Type from schema
type FormData = z.infer<typeof schema>;

export const Sign: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [serverError, setServerError] = useState<string>('');
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:5000/users?email=${data.email}`
      );
      const existingUser = await response.json();

      if (existingUser.length > 0) {
        setServerError('User already exists. Redirecting to login...');
        setTimeout(() => navigate('/'), 2000);
      } else {
        const newUser = {
          email: data.email,
          password: data.password,
        };

        await fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        navigate('/');
      }
    } catch (err) {
      setServerError('Server error, please try again later');
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1>Signup</h1>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>Email:</label>
            <input type="email" {...register('email')} />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input type="password" {...register('password')} />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div className="input-group">
            <label>Confirm Password:</label>
            <input type="password" {...register('confirmpassword')} />
            {errors.confirmpassword && (
              <p>{errors.confirmpassword.message}</p>
            )}
          </div>

          {serverError && <p className="errors">{serverError}</p>}

          <button type="submit">Sign Up</button>
        </form>
        <p className="link">
          Already have an account? <Link to="/">Sign In</Link>
        </p>
      </div>
    </div>
  );
};
