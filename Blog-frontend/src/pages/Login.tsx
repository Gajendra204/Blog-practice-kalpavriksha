import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { loginUser } from '../api/AuthService';
import axios from 'axios';
import './Login.css'; // Import the CSS file

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await loginUser(data);
      localStorage.setItem('token', response.data.token);
      navigate('/'); 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || 'Login failed');
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('email', { required: 'Email is required' })} className="input-field" placeholder="Email" />
          {errors.email && <p className="error-text">{errors.email.message}</p>}

          <input type="password" {...register('password', { required: 'Password is required' })} className="input-field" placeholder="Password" />
          {errors.password && <p className="error-text">{errors.password.message}</p>}

          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="account-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;