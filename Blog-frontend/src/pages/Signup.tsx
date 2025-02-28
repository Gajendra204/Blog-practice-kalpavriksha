import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/AuthService";
import axios from "axios";
import "./Signup.css"; 

interface SignupForm {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: SignupForm) => {
    try {
      await registerUser(data);
      navigate("/login"); 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Signup failed");
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("username", { required: "Username is required" })}
            className="input-field"
            placeholder="Name"
          />
          {errors.username && (
            <p className="error-text">{errors.username.message}</p>
          )}

          <input
            {...register("email", { required: "Email is required" })}
            className="input-field"
            placeholder="Email"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}

          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="input-field"
            placeholder="Password"
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
