import axios from 'axios';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import cafe from '../assets/image.png';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [contactNo, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('https://cafesphere-2-backend.onrender.com/user/signup', {
        name,
        email,
        location,
        contactNo,
        password,
      });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/login');
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#F4E7DD] px-4'>
      {/* Cafe Image */}
      <div className='w-full flex justify-center mt-16 mb-6'>
        <img src={cafe} alt='Cafe' className='w-[30vh] sm:w-[35vh] md:w-[40vh]' />
      </div>

      {/* Signup Card */}
      <div className='bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-xl font-semibold italic text-black mb-1'>Create your account</h2>
        <p className='text-[#6F4D36] mb-6'>Signup to Book Cafe for your celebration</p>

        <form onSubmit={onSubmitHandler}>
          {/* Full Name */}
          <label className='block text-black text-sm font-medium'>Full Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full p-2 rounded bg-[#F4E7DD] mb-3 border-none focus:outline-none focus:ring-0'
            placeholder='John Doe'
            required
          />

          {/* Email */}
          <label className='block text-black text-sm font-medium'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 rounded bg-[#F4E7DD] mb-3 border-none focus:outline-none focus:ring-0'
            placeholder='doe@gmail.com'
            required
          />

          {/* Location */}
          <label className='block text-black text-sm font-medium'>Location</label>
          <input
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className='w-full p-2 rounded bg-[#F4E7DD] mb-3 border-none focus:outline-none focus:ring-0'
            placeholder='Address, City'
            required
          />

          {/* Contact Number */}
          <label className='block text-black text-sm font-medium'>Contact Number</label>
          <input
            type='tel'
            value={contactNo}
            onChange={(e) => setContact(e.target.value)}
            className='w-full p-2 rounded bg-[#F4E7DD] mb-3 border-none focus:outline-none focus:ring-0'
            placeholder='+91 9876543XXX'
            required
          />

          {/* Password */}
          <label className='block text-black text-sm font-medium'>Password</label>
          <div className='relative mb-3'>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 rounded bg-[#F4E7DD] border-none focus:outline-none focus:ring-0'
              placeholder='••••••••'
              required
            />
            <span
              className='absolute inset-y-0 right-3 flex items-center cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <label className='block text-black text-sm font-medium'>Confirm Password</label>
          <div className='relative mb-5'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full p-2 rounded bg-[#F4E7DD] border-none focus:outline-none focus:ring-0'
              placeholder='••••••••'
              required
            />
            <span
              className='absolute inset-y-0 right-3 flex items-center cursor-pointer'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-[#8B5A2B] text-white py-2 rounded hover:bg-[#6B4226] transition duration-200'
          >
            Create Account
          </button>
        </form>

        {/* Navigation Links */}
        <p className='text-center text-sm mt-4 text-[#6F4D36]'>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className='font-medium cursor-pointer hover:underline'
          >
            Sign in
          </span>
        </p>

        <p className='text-center text-sm mt-2 text-[#6F4D36]'>
          Are you an owner?{' '}
          <span
            onClick={() => navigate('/add-cafe')}
            className='font-medium cursor-pointer hover:underline'
          >
            Go to the owner portal
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;