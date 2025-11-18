import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';

// ✅ Define schema with Zod
const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Za-z]/, 'Password must include at least one letter')
    .regex(/\d/, 'Password must include one number'),
});

// ✅ Infer TS type from schema
type LoginFormData = z.infer<typeof schema>;

export const Log: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const [serverError, setServerError] = useState<string>('');
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:5000/users?email=${data.email}`
      );
      const json = await response.json();

      if (json.length > 0) {
        navigate('/sign');
      } else {
        setServerError('User not found');
      }
    } catch {
      setServerError('Server error, please try again later');
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" {...register('email')} />
            {errors.email && <p className="errors">{errors.email.message}</p>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" {...register('password')} />
            {errors.password && (
              <p className="errors">{errors.password.message}</p>
            )}
          </div>

          {serverError && <p className="errors">{serverError}</p>}

          <button type="submit">Login</button>
        </form>
        <p className="link">
          Don&apos;t have an account? <Link to="/sign">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
