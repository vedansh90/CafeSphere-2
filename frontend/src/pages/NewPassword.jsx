import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const newPassword = () => {

    let  [newPassword, setNewPassword] = useState("");
    let  [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("resetToken");
        console.log("token is -> ", token);
        try{
          const res = await axios.post("http://localhost:4000/user/login/make-new-password",
            {
                newPassword: newPassword,
                confirmPassword: confirmPassword
            },
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            }
            );
            
            if(res.data.success){
                // setMessage(res.data.message);
                setTimeout(() => navigate("/login"), 4000); 
                console.log("done");
            }else {
                // setMessage(res.data.message);
                console.log("not done")
            }
            
        }catch(err){
            console.error("Error requesting OTP:", err);
            // setMessage(err.response?.data || "Something went wrong");
        }
    }

  return (
    <div className='flex justify-center h-screen bg-[#F4E7DD]'>
        <div className='flex flex-col pt-15 items-center'>
        <div className='w-20 h-20 rounded-full bg-white '> </div>
        <div className='py-2'>
            <span className='text-2xl text-black'><i>Set new Password</i></span>
        </div>
        <div className='bg-white flex flex-col gap-3 p-3'>
            <div className='flex flex-col'>
                <span className='text-lg font-semibold'>Create new password</span>
                <span className='text-sm text-[#00000099]'>Your new password must be different from previously used passwords.</span>
            </div>

            <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-1 py-1'>
                    <span className='text-m'>New Password</span>
                    <input onChange={(e) => setNewPassword(e.target.value)} className='border border-[#00000040] rounded px-1 py-1' placeholder='Enter New Password' type="text" />
                </div>
                <div className='flex flex-col gap-1 py-1'>
                    <span className='text-m'>Confirm New Password</span>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} className='border border-[#00000040] rounded px-1 py-1' placeholder='Enter New Password' type="text" />
                </div>
                <button className='bg-black text-white py-1 my-2 rounded text-lg cursor-pointer'>Set New Password</button>
            </form>

        </div>
        <hr className='text-[#00000080]' />
            <div className='flex justify-center bg-[#9E9D9D40] py-2 cursor-pointer w-full'>
               <span className='text-sm text-[#403C3C]'> Back to sign in</span>
            </div>
    </div>
    </div>
  )
}

export default newPassword