import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/login.png';
import cafe from '../assets/image.png';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://cafesphere-2-backend.onrender.com/user/login', {
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.userName);
        console.log("User Logged In:", response.data.userName);
        window.location.href = "/";
      } else {
        console.log(response.data.message);
      }
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-[#F4E7DD] p-4'>
      {/* Cafe Image at the Top */}
      <img src={cafe} alt='Cafe' className='w-[40vh] sm:w-[50vh] mt-14' />

      {/* Login Container */}
      <div className='w-full max-w-6xl flex flex-col md:flex-row shadow-lg rounded-2xl overflow-hidden mt-5'>

        {/* Login Form Section */}
        <div className='w-full md:w-1/2 bg-white px-6 sm:px-8 py-10 flex flex-col items-center gap-6 justify-center'>
          <h2 className='font-semibold text-2xl text-gray-800 text-center'>Login to your account</h2>
          <form onSubmit={handleLogin} className='flex flex-col gap-4 w-full max-w-md'>
            <div className='w-full'>
              <label className='block text-gray-700 font-medium'>Email</label>
              <input
                className='px-3 py-2 w-full border rounded bg-[#D9D9D9] outline-none focus:ring-2 focus:ring-[#764B36]'
                placeholder='Enter your E-mail'
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className='w-full'>
              <label className='block text-gray-700 font-medium'>Password</label>
              <input
                className='px-3 py-2 w-full border rounded bg-[#D9D9D9] outline-none focus:ring-2 focus:ring-[#764B36]'
                placeholder='Enter your password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <span
              onClick={() => navigate('/login/forgot-password')}
              className='text-sm cursor-pointer text-blue-600 hover:underline self-end'
            >
              Forgot Password?
            </span>
            <button
              type='submit'
              className='w-full bg-[#764B36] text-white py-2 rounded-xl text-xl cursor-pointer hover:bg-[#5a382a] transition'
            >
              Log in
            </button>
          </form>
          <p className='text-sm text-center'>
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/sign')}
              className='font-medium cursor-pointer text-[#764B36] hover:underline'
            >
              Sign up here
            </span>
          </p>
        </div>

        {/* Image Section */}
        <div className='w-full md:w-1/2 bg-[#CDA58B] flex items-center justify-center p-6'>
          <img className='w-full max-w-xs sm:max-w-md max-h-[70vh] object-contain' src={loginImage} alt='Login' />
        </div>

      </div>
    </div>
  );
};

export default Login;
