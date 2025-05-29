import React, { useState, useEffect } from 'react';
import forgotPasswordImage from "../assets/forgotPassword.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerificationCodeUser = () => {

    const [verificationCode, setVerificationCode] = useState(0);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log(message);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/user/login/reset-password", { otp: verificationCode });

            if (res.data.success) {
                setMessage("Verification successful!");
                setTimeout(() => navigate("/login/forgot-password/verification-code/new-password"), 500);
                localStorage.setItem("resetToken", res.data.resetToken);
                const token = localStorage.getItem("resetToken");
                console.log("token in otp is -> ", token);
            } else {
                setMessage("Invalid verification code. Please try again.");
            }
        } catch (err) {
            console.error("Error verifying code:", err);
            setMessage(err.response?.data?.message || "Something went wrong");
        }
    };

  return (
    <form onSubmit={handleSubmit} className='flex w-full rounded-2xl px-4 py-4 justify-center' style={{backgroundColor: "#F4E7DD"}}>
            <div className='flex bg-white w-[90vw] rounded-2xl px-4 py-2 gap-10'>
                {/* left */}
            <div className='flex items-center w-2/4  px-8 py-8 flex-col justify-center rounded'>
                <div className='flex flex-col gap-8 w-full items-center px-2'>
                    <div className='flex flex-col items-center'>
                    <p className='text-2xl text-[#764B36] font-medium'>Verification Code Sent!</p>
                    <p className='tracking-wide text-m'>Please check your email for a 6-digit verification code.</p>
                    </div>
    
                    <div className='flex flex-col items-center'>
                    <p className='tracking-wide text-sm'>Enter the code we sent to your email.</p>
                    <p className='tracking-wide text-sm'>Make sure to check your spam or junk folder if you don’t see the email.</p>
                    </div>
    
                    <div className='flex flex-col items-center gap-1 w-full'>
                    <input value={verificationCode} onChange={(e)=> setVerificationCode(e.target.value)} className='w-3/4 py-3 px-2 rounded' style={{backgroundColor: "#D9D9D9"}} type="number" placeholder='Enter the code' />
                    <span className='text-end text-sm'>Didn’t receive the code?<span className='cursor-pointer'>Resend code.</span></span>
                    </div>
                    <div className='w-3/4 flex justify-center'>
                        <button className='text-white py-2 px-3 rounded cursor-pointer w-1/4' style={{backgroundColor: "#764B36"}}>Submit</button>
                    </div>
                </div>
                {message && <p className="text-red-500">{message}</p>}
            </div>
    
            {/* right */}
            <div className='2/4'>
                <img className='w-full max-h-[82vh] object-contain' src={forgotPasswordImage} alt="dhjbj" />
            </div>
            </div>
            
        </form>
  )
}

export default VerificationCodeUser