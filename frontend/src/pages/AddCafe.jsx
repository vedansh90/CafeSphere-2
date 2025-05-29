import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCafe = () => {
    const [state, setState] = useState("Signup");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        ownerName: "",
        email: "",
        password: "",
        confirmPassword: "",
        location: "",
        city: "",
        contactNo: "",
        bio: "",
        image: "",
        categories: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (state === "Signup") {
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            try {

                const response = await axios.post('http://localhost:4000/owner/add-cafe', formData);

                if (response.data.success) {
                    alert("Cafe Added Successfully");
                    setFormData({
                        name: "",
                        ownerName: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        location: "",
                        city: "",
                        contactNo: "",
                        bio: "",
                        image: "",
                        categories: "",
                        tableCharge: "",
                    });
                    navigate("/");
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error("Error adding cafe:", error);
                alert("Failed to add cafe. Please try again later.");
            }
        } else {
            try {
                const response = await axios.post('http://localhost:4000/owner/login', {
                    email: formData.email,
                    password: formData.password,
                });

                if (response.data.success) {
                    localStorage.setItem("token", response.data.token);
                    alert("Login Successful");
                    navigate(`/owner-dashboard/${response.data.userId}`);
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error("Login Error:", error);
                alert("Invalid email or password");
            }
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='w-full flex justify-center py-5 bg-[#F4E7DD]'>
            {state === "Signup" ?
                <div className="min-h-screen w-[95vw] flex justify-center items-center p-4">
                    <div className="bg-white w-full rounded-2xl shadow-lg px-4 sm:px-8 py-8">
                        <p className="font-bold text-2xl sm:text-3xl text-center italic">Register Your Cafe Now</p>
                        <p className="text-sm font-medium text-center italic mt-1">
                            <span>Already have an account? </span>
                            <span onClick={() => setState("Login")} className="cursor-pointer text-red-600">
                                Login
                            </span>
                        </p>
                        <div className="flex justify-center mt-9 mb-9">
                            <h1 className="text-red-800 text-2xl sm:text-4xl text-center">
                                Fill Every Seat - Let Party Lovers Find Your Cafe!
                            </h1>
                        </div>

                        {/* Name + Owner */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <div className="flex flex-col w-full sm:w-96">
                                <label htmlFor="name">Cafe Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Cafe Name"
                                    className="bg-[#F4E7DD] p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500" required />
                            </div>
                            <div className="flex flex-col w-full sm:w-96">
                                <label htmlFor="ownerName">Cafe-Owner Name</label>
                                <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="Owner Name"
                                    className="bg-[#F4E7DD] p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500" required />
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="flex justify-center mt-4">
                            <div className="flex flex-col w-full sm:w-[780px]">
                                <label htmlFor="bio">Cafe Bio</label>
                                <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Add Cafe Bio"
                                    className="bg-[#F4E7DD] p-4 rounded-md border border-gray-300 resize-none focus:ring-2 focus:ring-orange-500"
                                    required />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex justify-center mt-4">
                            <div className="flex flex-col w-full sm:w-[780px]">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email"
                                    className="bg-[#F4E7DD] p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500"
                                    required />
                            </div>
                        </div>

                        {/* Passwords */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                            <div className="flex flex-col w-full sm:w-96">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password"
                                    className="bg-[#F4E7DD] p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500"
                                    required />
                            </div>
                            <div className="flex flex-col w-full sm:w-96">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password"
                                    className="bg-[#F4E7DD] p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500"
                                    required />
                            </div>
                        </div>

                        {/* Location + City */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                            <div className="flex flex-col w-full sm:w-96">
                                <label htmlFor="location">Location</label>
                                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location"
                                    className="bg-[#F4E7DD] p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500"
                                    required />
                            </div>
                            <div className="flex flex-col w-full sm:w-96">
                                <label htmlFor="city">City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City"
                                    className="bg-[#F4E7DD] p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500"
                                    required />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="flex justify-center mt-4">
                            <div className="flex flex-col w-full sm:w-[780px]">
                                <label htmlFor="categories">Categories</label>
                                <input type="text" name="categories" value={formData.categories} onChange={handleChange} placeholder="Categories (comma separated)"
                                    className="bg-[#F4E7DD] p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500"
                                    required />
                            </div>
                        </div>

                        {/* Image URL */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
 {/* Cafe Image URL */}
 <div className="flex flex-col w-full sm:w-96">
   <label htmlFor="image">Cafe Image URL</label>
   <input
     type="text"
     name="image"
     value={formData.image}
     onChange={handleChange}
     placeholder="Cafe Image URL"
     className="bg-[#F4E7DD] p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500"
     required
   />
 </div>
 {/* Tables Charges */}
 <div className="flex flex-col w-full sm:w-96">
   <label htmlFor="tableCharge">Booking Amount</label>
   <input
     type="Number"
     name="tableCharge"
     value={formData.tableCharge}
     onChange={handleChange}
     placeholder="Enter Booking Charges"
     className="bg-[#F4E7DD] p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500"
     required
   />
 </div>
</div>

                        {/* Contact */}
                        <div className="flex justify-center mt-4">
                            <div className="flex flex-col w-full sm:w-96">
                                <label htmlFor="contactNo">Contact Number</label>
                                <div className="flex items-center border border-gray-300 rounded-md bg-[#F4E7DD] p-1 focus-within:ring-2 focus-within:ring-orange-500">
                                    <select className="bg-transparent p-3 rounded-l-md focus:outline-none">
                                        <option value="+91">+91</option>
                                        <option value="+1">+1</option>
                                        <option value="+44">+44</option>
                                        <option value="+61">+61</option>
                                    </select>
                                    <input type="tel" name="contactNo" value={formData.contactNo} onChange={handleChange} placeholder="Contact Number"
                                        className="w-full bg-transparent p-1 focus:outline-none" required />
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-center items-center mt-6">
                            <button type="submit"
                                className="w-full sm:w-96 bg-[#FD8403] hover:bg-orange-600 text-white font-medium text-lg p-3 rounded-xl transition duration-200">
                                Register
                            </button>
                        </div>
                    </div>
                </div>
                :
                <div className='w-[95vw] flex flex-col md:flex-row rounded-2xl px-4 py-2'>
                    {/* content */}
                    <div className='w-full md:w-2/4 bg-white px-8 py-8 flex flex-col items-center gap-9 justify-center rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl'>
                        <p className='font-medium text-2xl'>Login to your Cafe account</p>
                        <div className='flex flex-col gap-2 text-end w-full sm:w-2/3'>
                            <div className='text-start'>
                                <p>Email</p>
                                <input className='px-2 py-2 w-full bg-[#D9D9D9]' placeholder='Enter your E-mail' type="email" onChange={handleChange} name='email' />
                            </div>
                            <div className='text-start'>
                                <p>Password</p>
                                <input className='px-2 py-2 w-full bg-[#D9D9D9]' placeholder='Enter your password' type="password" onChange={handleChange} name="password" />
                            </div>
                            <span className='text-sm cursor-pointer text-right'>Forgot Password?</span>
                        </div>
                        <div className='flex flex-col gap-2 w-full sm:w-2/3'>
                            <button className='bg-[#764B36] text-white py-2 rounded-xl text-xl'>Log in</button>
                            <span className='text-sm'>Don't have an account? <span onClick={() => setState("Signup")} className='font-medium text-[#764B36] cursor-pointer'>Click here</span></span>
                        </div>
                    </div>
                    {/* image */}
                    <div className='w-full md:w-2/4 bg-[#CDA58B] rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl'>
                        <img className='w-full h-full object-contain max-h-[82vh]' src="./src/assets/login.png" alt="login" />
                    </div>
                </div>
            }
        </form>
    );
};

export default AddCafe;
