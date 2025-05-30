import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const BookingDashboard = () => {

    const navigate = useNavigate()
    const location = useLocation();

    const {id} = useParams();
    const [cafe, setcafe] = useState({bookings: []});


    useEffect(()=> {
        axios.get(`https://cafesphere-2-backend.onrender.com/owner/owner-dashboard/${id}`)
        .then(response => {
            setcafe(response.data)
        })
        .catch(err => {
            console.log("Error Fetching Data");
        })
    }, [id]);

    const isActive = (path) => location.pathname === path ? "text-white font-semibold" : "text-gray-200/80";

    return (
        <div className='flex h-[100vh]'>
            {/* left side */}
            <div style={{backgroundColor: "#994812"}} className='w-1/4'>
                <div className='h-2/4 flex flex-col justify-between'>
                <div className='flex justify-start pt-3 ps-4 pb-3 shadow-[0_4px_10px_rgba(255,255,255,0.2)]'>
                    <p className='font-medium text-2xl text-[#F5E1C8]'>CafeSphere</p>
                </div>
    
                <ul className='flex flex-col justify-evenly h-2/3'>
                    <li onClick={()=> navigate(`/owner-dashboard/${id}`)} className={`ps-15 pt-2 text-xl border-b border-white-800 cursor-pointer ${isActive(`/owner-dashboard/${id}`)}`}>Dashboard</li>
                    <li onClick={()=> navigate(`/owner-dashboard/${id}/bookings`)} className={`ps-15 pt-2 text-xl border-b border-white-800 cursor-pointer ${isActive(`/owner-dashboard/${id}/bookings`)}`}>Bookings</li>
                    <li className='ps-15 pt-2 text-gray-200/80 text-xl border-b border-b-gray-400 cursor-pointer'>Menu items</li>
                    <li className='ps-15 pt-2 text-gray-200/80 text-xl border-b border-b-gray-400 cursor-pointer'>Customer Details</li>
                    <li className='ps-15 pt-2 text-gray-200/80 text-xl border-b border-b-gray-400 cursor-pointer'>Settings</li>
                </ul>
                </div>
            </div>
    
            {/* right side */}
            <div style={{backgroundColor: "#2D1E19"}} className='flex-col w-full text-white h-100vw'>
                <div className='flex justify-between pt-3 ps-4 pb-3 shadow-[0_4px_10px_rgba(255,255,255,0.2)]'>
                    <p className='text-lg'>Welcome, <span className='text-amber-500 text-2xl'>{cafe.ownerName}</span></p>
                    <div>
                        <p className='pr-10'>{cafe.name}</p>
                    </div>
                </div>
                <div className='flex flex-col h-2/3'>
                    <div className='flex flex-col h-4/4 justify-start '>
                    <div className='flex flex-col py-8 px-13 gap-1'>
                        <p className='text-4xl'>Bookings</p>
                    </div>
                    <div className='flex w-full justify-evenly'>
                        <table style={{backgroundColor: "#40322E"}} className='w-[95%] max-h-106 rounded text-center'>
                            <thead>
                                <tr>
                                <th className='border-r-white border-b p-1 '>Name</th>
                                <th className='border-r-white border-b border-l p-1 py-2'>Booking Status</th>
                                <th className='border-r-white border-b border-l p-1 '>Category</th>
                                <th className='border-r-white border-b border-l p-1 '>Booking Date</th>
                                <th className='border-l border-b p-1 rounded-xl'>Booking Time</th>
                                </tr>
                            </thead>
                            <tbody>
                            {cafe.bookings.length > 0 && cafe.bookings.map((booking, index) => (
                                            <tr key={index}>
                                                <td className='border-r-white border-b p-1 '>{booking.bookingName}</td>
                                                <td className='border-r-white border-b border-l p-1 py-2'>{}</td>
                                                <td className='border-r-white border-b border-l p-1 '>{}</td>
                                                <td className='border-r-white border-b border-l p-1 '>
                                                {new Date(booking.date).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric"
                                                })}
                                                </td>
                                                <td className='border-l border-b p-1 rounded-xl'>{booking.timeSlot}</td>
                                            </tr>
                                        ))
                            }
                            </tbody>
                        </table>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
      )
}

export default BookingDashboard