import React, { useState } from 'react'
import forgotPasswordImage from "../assets/forgotPassword.png";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const ForgotPassUser = () => {

    const [userEmail, setUserEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const requestOTP = async (event) => {
        event.preventDefault();
        try{
            const res = await axios.post("http://localhost:4000/user/login/forgot-password", 
            {email: userEmail});
            
            if(res.data.success){
                setMessage(res.data.message);
                setTimeout(() => navigate("/login/forgot-password/verification-code"), 4000); 
            }else {
                setMessage(res.data.message);
            }
            
        }catch(err){
            console.error("Error requesting OTP:", err);
            setMessage(err.response?.data || "Something went wrong");
        }
    }

  return (
    <form onSubmit={requestOTP} className='flex w-full rounded-2xl px-4 py-4 justify-center' style={{backgroundColor: "#F4E7DD"}}>
        <div className='flex bg-white w-[90vw] rounded-2xl px-4 py-2 gap-4'>
            {/* left */}
        <div className='flex items-center w-2/4  px-8 py-8 flex-col gap-9 justify-center rounded-l-2xl'>
            <div className='flex flex-col gap-8 w-full'>
                <div className='flex flex-col items-center'>
                <p className='text-2xl text-[#764B36] font-medium'>Forgot your password?</p>
                <p className='tracking-widest text-sm'>No worries! Let’s get you back on track.</p>
                </div>

                <div className='flex flex-col items-center'>
                <p className='tracking-wide'>Enter the email address associated with your account.</p>
                <p className='tracking-wide'> We’ll send you a login code to reset your password.</p>
                </div>

                <div className='flex flex-col items-center'>
                <input onChange={(e) => setUserEmail(e.target.value)} className='w-2/4 py-3 px-2 rounded' style={{backgroundColor: "#D9D9D9"}} type="email" placeholder='Enter your E-mail' />
                </div>
                <div className='flex px-20 justify-between'>
                    <button type='button' onClick={()=> navigate("/login")} className='text-white py-2 px-3 rounded cursor-pointer' style={{backgroundColor: "#764B36"}}>Back to login</button>
                    <button type='submit' className='text-white py-2 px-3 rounded cursor-pointer' style={{backgroundColor: "#764B36"}}>Get Code</button>
                </div>
            </div>
            {message && <p className='text-red-500 text-sm mt-2'>{message}</p>}
        </div>

        {/* right */}
        <div className='2/4'>
            <img className='w-full max-h-[82vh] object-contain' src={forgotPasswordImage} alt="dhjbj" />
        </div>
        </div>
        
    </form>
  )
}

export default ForgotPassUser