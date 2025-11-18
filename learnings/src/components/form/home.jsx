import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Za-z]/, "Password must include at least one letter")
    .matches(/\d/, "Password must include at least one number")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Fetch user by email
      const response = await axios.get(`http://localhost:5000/users?email=${data.email}`);

      if (response.data.length === 0) {
        alert("User not found.");
        return;
      }

      const user = response.data[0];

      // Check password
      if (user.password !== data.password) {
        alert("Invalid email or password.");
        return;
      }

      // Success - Navigate to Home
      navigate("/home");
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input {...register("email")} />
        <p>{errors.email?.message}</p>
      </div>

      <div>
        <label>Password:</label>
        <input type="password" {...register("password")} />
        <p>{errors.password?.message}</p>
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
