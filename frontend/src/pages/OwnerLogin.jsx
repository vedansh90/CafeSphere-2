import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OwnerLogin = () => {
  let [state, setState] = useState("Signup");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [contactNo, setContactNo] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(()=> {
    window.scroll(0, 0)
  }, [])

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    try {
        if (state === 'Signup') {
            // Signup Request
            const response = await axios.post('https://cafesphere-2-backend.onrender.com/owner/signup', {
                name,
                email,
                password,
                contactNo
            });

            setMessage(response.data.message);
            if (response.data.success) {
                localStorage.setItem('token', response.data.token); // Store token
                setState('Login'); // Switch to login after signup
            }
        } else {  
            // Login Request
            const response = await axios.post('https://cafesphere-2-backend.onrender.com/owner/login', {
                email,
                password
            });

            // Debugging Log the response to check if `user` exists
            console.log("Login Response:", response.data);

            if (response.data.success) {
                localStorage.setItem('token', response.data.token);

                if (response.data.user && response.data.user.id) {
                    const ownerId = response.data.user.id; 
                    console.log("Extracted Owner ID:", ownerId); 

                    setMessage('Login successful! Redirecting...');
                    setTimeout(() => {
                        navigate(`/owner-dashboard/${ownerId}`);
                    }, 1500);
                } else {
                    setMessage('Login successful, but no ID found.');
                }
            } else {
                setMessage(response.data.message);
            }
        }
    } catch (error) {
        setMessage(error.response?.data?.message || 'Something went wrong');
    } finally {
        setLoading(false);
    }
};


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] py-10 my-10 flex justify-center'>
      <div style={{backgroundColor: "#D6CACB"}} className='shadow-gray-700 shadow-sm w-1/3 rounded-3xl py-3'>
        <p className='text-xl font-medium text-gray-600 text-center'>
          {state === "Signup" ? "Create account" : "Login"}
        </p>

        {state === "Signup" && (
          <>
            <div className='flex-col pl-16 mt-3'>
              <p>Name:</p>
              <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-2/3 border border-gray-400 rounded' />
            </div>
            <div className='flex-col pl-16 mt-3'>
              <p>Contact No:</p>
              <input onChange={(e) => setContactNo(e.target.value)} value={contactNo} type="number" className='w-2/3 border border-gray-400 rounded' />
            </div>
          </>
        )}

        <div className='flex-col pl-16 mt-3'>
          <p>Email:</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-2/3 border border-gray-400 rounded' />
        </div>
        <div className='flex-col pl-16 mt-3'>
          <p>Password:</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-2/3 border border-gray-400 rounded' />
        </div>

        <p className='text-center text-sm py-4'>
          {state === "Signup"
            ? "Already have an account? "
            : "Don't have an account? "}
          <span className='cursor-pointer text-blue-500' onClick={() => setState(state === "Signup" ? "Login" : "Signup")}>
            {state === "Signup" ? "Login here" : "Signup here"}
          </span>
        </p>

        {message && <p className="text-center text-red-500">{message}</p>}
        <button type="submit" className='bg-blue-500 text-white w-[10vw] h-[50px] rounded font-medium cursor-pointer' disabled={loading}>
          {loading ? "Processing..." : state === "Signup" ? "Signup" : "Login"}
        </button>
      </div>
    </form>
  );
};

export default OwnerLogin;
