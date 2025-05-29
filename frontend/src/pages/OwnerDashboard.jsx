 import { useState, useEffect } from "react";
 import {  useParams } from 'react-router-dom'
 import axios from 'axios'
 import { LogOut } from "lucide-react";

const Dashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [activeSection, setActiveSection] = useState("Bookings");
  const [bookings, setBookings] = useState([]);
  const [cafe, setCafe] = useState({})
  const [menu, setMenu] = useState([])
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    };
    updateDateTime();
    
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);
 
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCafeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/owner/owner-dashboard/${id}`);
        setCafe(response.data);
        setBookings(response.data.bookings || []);
        console.log(response.data);
        setMenu(response.data.menu || []);
      } catch (error) {
        console.error("Error fetching cafe details:", error);
      }
    };

    fetchCafeDetails();
  }, [id]);

  const averageGuests =
  bookings.length > 0
    ? (
        bookings.reduce((total, booking) => total + (booking.guests || 0), 0) /
        bookings.length
      ).toFixed(1)
    : 0;
   
  const stats = [
    { title: "Total Bookings", value: bookings.length || 0, subtitle: "All-time booking count", icon: "📅" },
    { title: "This Month", value: bookings.length/2 || 0, subtitle: "Bookings this month", icon: "📅" },
    { title: "Revenue", value: bookings.amount || 0, subtitle: "From bookings and events", icon: "🔒" },
    { title: "Average party size", value: averageGuests, subtitle: "Guests per booking", icon: "👥" },
  ];
  
  
  

  const reviews = [
    {
      id: 1,
      name: "Roy Keene",
      rating: 4.2,
      review: "I enjoyed the place as well as the environment. The staff was amazing and also took care of our orders.",
    },
    {
      id: 2,
      name: "Samuel Eto",
      rating: 4.5,
      review: "Great ambiance! Will visit again for sure.",
    },
    {
      id: 3,
      name: "Wayne Rooney",
      rating: 3.8,
      review: "The food was good, but the service could be improved.",
    },  
  ];

  const handleConfirmBooking = async (id) => {
    console.log(id);
    try{
      const res = await axios.post('http://localhost:4000/owner/owner-dashboard/confirm-booking', {
        id,
      });

      if (res.data.success) {
        alert("Booking confirmed!");
        setBookings(prev =>
          prev.map(booking =>
            booking._id === id ? { ...booking, status: "Confirmed" } : booking
          )
        );
      } else {
        alert(res.data.message || "Failed to confirm booking.");
      }
    }
    catch(err){
      console.error("Error confirm booking", err);
    }
  }

  const handleRejectBooking = async (id) => {
    console.log(id);
    try{
      const res = await axios.post('http://localhost:4000/owner/owner-dashboard/reject-booking', {
        id,
      });

      if (res.data.success) {
        alert("Booking Rejected!");
        setBookings(prev =>
          prev.map(booking =>
            booking._id === id ? { ...booking, status: "Rejected" } : booking
          )
        );
      } else {
        alert(res.data.message || "Failed to reject booking.");
      }
    }
    catch(err){
      console.error("Error reject booking", err);
    }
  }

  const [inputValueToken, setInputValueToken] = useState("");

  const handleChangeToken = (e) => {
    setInputValueToken(e.target.value);
  };

  const handleTokenSubmit = async(e) => {
    e.preventDefault();

  try {
    const response = await axios.post("http://localhost:4000/owner/owner-dashboard/verify-token", {
      token: inputValueToken,
    });

    console.log("Server response:", response.data);
  } catch (error) {
    console.error("Error submitting token:", error.response?.data || error.message);
  }
  }

  const handleMenuModalSubmit = async(e) => {
    e.preventDefault();

    try {
        const response = await axios.post(`http://localhost:4000/owner/owner-dashboard/${id}/menu`, {
        itemName: itemName,
        price: price,
    });
      console.log("Server response:", response.data);

      setMenu((prevItems) => [
        ...prevItems, 
        { itemName, price }
      ]);

      setItemName('');
      setPrice('');
      closeModal();

      } catch (error) {
        console.error("Error submitting token:", error.response?.data || error.message);
      }
    }

    const handleMenuDelete = async(menuId) => {
      // e.preventDefault();
      
      try {
          const response = await axios.delete(`http://localhost:4000/owner/owner-dashboard/${id}/menu`, {
          data: {menuId},
      });
        console.log("Server response:", response.data);
  
        setMenu((prevItems) => prevItems.filter((item) => item._id !== menuId));
  
        } catch (error) {
          console.error("Error submitting token:", error.response?.data || error.message);
        }
      }

      const [isCafeOpen, setIsCafeOpen] = useState(true);

       useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/owner/owner-dashboard/status/${id}`);
        setIsCafeOpen(res.data.isOpen);
      } catch (error) {
        console.error('Failed to fetch cafe status:', error);
      }
    };

    fetchStatus();
  }, [id]);

  const handleToggle = async () => {
    try {
      await axios.put('http://localhost:4000/owner/owner-dashboard/status', { id });

      // ✅ Optimistically toggle status
      setIsCafeOpen((prev) => !prev);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };
  
  

  return (
    <div className="bg-[#EDE0D4] min-h-screen">
      {/* Navbar */}
      {/* <div className="bg-white py-3 shadow-md p-4 flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#5A3E2B]">CafeSphere</h1>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 text-lg">🔔</button>
          <button 
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
               className="bg-[#B03030] text-white px-3 py-1  rounded flex gap-1 items-center cursor-pointer"> <LogOut size={12} />Log out</button>
        </div>
      </div> */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center mb-6">
    <h1 className="text-xl font-bold text-[#5A3E2B]">CafeSphere</h1>
    <div className="flex items-center space-x-4">
        
       <div className="flex items-center space-x-6">
      {/* Cafe Status Switch */}
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-[#5A3E2B] w-[80px]">
          {isCafeOpen ? 'Cafe Open' : 'Cafe Closed'}
        </label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isCafeOpen}
            onChange={handleToggle}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 peer-focus:ring-4 peer-focus:ring-green-300 transition-all duration-300"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-full transition-all duration-300"></div>
        </label>
      </div>
      <button className="text-gray-600 text-lg">🔔</button>
      <button
      onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
      className="bg-[#B03030] text-white px-4 py-2 rounded cursor-pointer">Log out</button>
    </div>
  </div>
       </div>

      {/* Dashboard Header */}
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-[#5A3E2B]">{cafe.name || 0}</h1>
        <h6 className="text-gray-600">Owner Dashboard</h6>
        <p className="text-sm text-gray-500">{currentDateTime}</p>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-lg">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-[#5A3E2B]">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-[#5A3E2B]">{stat.title}</h3>
              <span className="text-lg">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-[#5A3E2B] mt-2">{stat.value}</p>
            <p className="text-xs text-[#5A3E2B]">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      <hr className="border-t-2 border-[#5A3E2B] my-6 w-full" />

      {/* Dashboard Navigation */}
      <div className="flex max-w-7xl space-x-4 mb-4 w-1/3 justify-end">
        <button
          className={`px-4 py-2 rounded ${activeSection === "Bookings" ? "bg-[#D2B48C] text-white" : "bg-[#F5EDE6] text-gray-700"}`}
          onClick={() => setActiveSection("Bookings")}
        >
          Bookings
        </button>
        <button
          className={`px-4 py-2 rounded ${activeSection === "Menu" ? "bg-[#D2B48C] text-white" : "bg-[#F5EDE6] text-gray-700"}`}
          onClick={() => setActiveSection("Menu")}
        >
          Menu
        </button>
        <button
          className={`px-4 py-2 rounded ${activeSection === "Reviews" ? "bg-[#D2B48C] text-white" : "bg-[#F5EDE6] text-gray-700"}`}
          onClick={() => setActiveSection("Reviews")}
        >
          Reviews
        </button>
        <button
          className={`px-4 py-2 rounded ${activeSection === "Settings" ? "bg-[#D2B48C] text-white" : "bg-[#F5EDE6] text-gray-700"}`}
          onClick={() => setActiveSection("Settings")}
        >
          Settings
        </button>
      </div>

      {/* Conditional Sections */}
      <div className="mx-4 my-4 bg-white p-6 rounded-lg shadow-md">
        {activeSection === "Bookings" && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-[#5A3E2B]">Recent Bookings</h2>
            <div className="space-y-4">
              {bookings.map((booking, index) => (
                <div key={index} className="p-4 border border-[#6F4D36] shadow rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex gap-4 items-center">
                        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                      <div>
                      <h3 className="text-lg font-semibold">{booking.bookingName}</h3>
                      <p className="text-sm text-gray-600">{booking.date}</p>
                      </div>
                      </div>
                      <div className="flex justify-between w-3/4">
                      <p className="text-sm flex flex-col items-center text-[#6F4D36]">Occasion: <strong>{booking.partyType || "Not Defined"}</strong></p>
                      <p className="text-sm flex flex-col items-center text-[#6F4D36]">Guests: <strong>{booking.guests} people</strong></p>
                      <p className="text-sm flex flex-col items-center text-[#6F4D36]">Table: <strong>{booking.status === "Confirmed" ? "Assigned" : "Not Assigned"}</strong></p>
                      </div>
                    </div>
                    <div>
                      {booking.status === "Pending" && (
                        <span className="text-yellow-600 px-2 py-1 rounded bg-yellow-100">Pending</span>
                      )}
                      {booking.status === "Rejected" && (
                        <span className="text-red-600 px-2 py-1 rounded bg-red-100">Rejected</span>
                      )}
                      {booking.status === "Confirmed" && (
                        <span className="text-green-600 px-2 py-1 rounded bg-green-100">Confirmed</span>
                      )}
                      {booking.status === "Approved" && (
                        <span className="text-pink-600 px-2 py-1 rounded bg-pink-100">Approved</span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between">
                  <div className="mt-4 flex space-x-2 gap-3">
                  {booking.status === "Pending" && (
                    <>
                      <button  onClick={() => handleConfirmBooking(booking._id)} className="bg-[#35AEA6] text-white px-3 py-1 rounded cursor-pointer">Confirm</button>
                      <button onClick={() => handleRejectBooking(booking._id)} className="bg-[#C1272D] text-white px-3 py-1 rounded cursor-pointer">Reject</button>
                    </>
                  )}
                  <button className="bg-[#F4E7DD] text-[#6F4D36] px-2 py-1 rounded border cursor-pointer">Message</button>
                  <button className="bg-[#F4E7DD] text-[#6F4D36] px-2 py-1 rounded border cursor-pointer">View Details</button>
                </div>
                {booking.status !== "Approved" && booking.status !== "Pending" && booking.status !== "Rejected"? 
                <form onSubmit={handleTokenSubmit} className="flex gap-3 items-end">
                <p className="items-start">Token No:</p>
                <input onChange={handleChangeToken} value={inputValueToken}  placeholder="Enter Token No." type="number" name=""  className="bg-gray-100 border border-[#6F4D36] px-1 h-7 rounded-l" />
                <button type="submit" className="px-2 py-0.5  bg-[#F4E7DD] text-[#6F4D36] relative -left-3.5 border border-l-0 border-[#6F4D36] h-7 rounded-r cursor-pointer">Submit</button>
              </form>: "" }
                  
                  </div>
                </div>
                
              ))}
            </div>
          </>
        )}

      {activeSection === "Menu" && (
          <>
            <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4 text-[#5A3E2B]">Menu</h2>
            <i class="fa-solid fa-square-plus cursor-pointer border h-6 p-1 rounded text-[#5A3E2B]"><button onClick={openModal} className="font-normal pl-2 cursor-pointer">Add New</button></i>
            </div>
            <div className="space-y-4">
              {menu.map((item, index) => (
                 <div key={index} className="p-4 border border-[#6F4D36] shadow rounded-lg">
                 <div className="flex justify-between items-center">
                   <div className="flex flex-col gap-4 w-full">
                     <div className="flex gap-4 items-center">
                       <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                     <div>
                     <h3 className="text-lg font-semibold">{item.itemName}</h3>
                     <p className="text-sm text-gray-600">₹ {item.price}</p>
                     </div>
                     </div>
                   </div>
                 </div>
                 <div className="flex justify-between">
                 <div className="mt-4 flex space-x-2 gap-3">
                 <button className="bg-[#F4E7DD] text-[#6F4D36] px-2 py-1 rounded border cursor-pointer">Edit</button>
                 <button onClick={() => handleMenuDelete(item._id)} className="bg-[#F4E7DD] text-[#6F4D36] px-2 py-1 rounded border cursor-pointer">Delete</button>
               </div>
                 </div>
               </div>
              ))}
            </div>
          </>
        )}

        {activeSection === "Reviews" && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-[#5A3E2B]">Customer Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="p-4 border border-[#5A3E2B] shadow rounded-lg">
                  <h3 className="text-lg font-semibold">{review.name}</h3>
                  <p className="text-yellow-500">⭐ {review.rating}</p>
                  <p className="text-gray-600 mt-1">{review.review}</p>
                </div>
              ))}
            </div>
          </>
        )}

{isModalOpen && (
        <div style={{backgroundColor: "#808080", opacity: "90%"}} className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
            <form onSubmit={handleMenuModalSubmit}>
              <div className="mb-4">
                <label htmlFor="itemName" className="block text-sm font-medium">Item Name</label>
                <input
                  type="text"
                  id="itemName"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default Dashboard;
