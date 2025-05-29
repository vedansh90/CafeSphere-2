import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import deleteImage from "../assets/delet.png";
import { useParams } from "react-router-dom";
// import Loader from "../assets/original-0e6fdb1ed026c5d0c908737a6dbfdb42.png";
import Loader from "../assets/original-0e6fdb1ed026c5d0c908737a6dbfdb42 (1).png";
import { useNavigate } from "react-router-dom";

import {
  User,
  CalendarCheck,
  Heart,
  Settings,
  LogOut,
  Star,
  MapPin,
} from "lucide-react";
import { FaRProject } from "react-icons/fa";

const Profileuser = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [savecafe, setsavecafe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("profile");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
 const [userImg, setUserImg] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        contactNo: user.contactNo || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const removeFromWishlist = async (cafeId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(`http://localhost:4000/user/profile/save-cafe`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          cafeId: cafeId 
        }
      });
      setsavecafe(prevCafes => prevCafes.filter(cafe => cafe._id !== cafeId));
      console.log("cafe removed from wishlist");
  
    } catch (error) {
      console.error('Error from wishlist:', error.message);
    }
  };

  const toggleEdit = async () => {
    if (isEditing) {
      try {
        await axios.put(
          `http://localhost:4000/user/profile/update-details`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser((prev) => ({ ...prev, ...formData }));
        alert("Profile updated successfully");
      } catch (err) {
        console.error("Error updating profile", err);
        alert("Failed to update profile");
      }
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(
          `http://localhost:4000/user/profile/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(userRes.data.user);
        setBookings(userRes.data.user.bookings);

        const savedRes = await axios.get(
          `http://localhost:4000/user/saved-cafes`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setsavecafe(savedRes.data.savedCafes);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (token && id) {
      fetchData();
    } else {
      setLoading(false);
      setError("No token or invalid ID");
    }
  }, [id, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F8F0C8]">
        <img src={Loader} alt="Loading..." className="w-3xl" />
      </div>
    );
  }

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex" style={{ backgroundColor: "#F4E7DD" }}>
      {/* Left Sidebar */}
      <div className="w-1/4 px-2 py-4">
        <div className="bg-white min-h-[85vh] rounded-2xl px-4 py-2 flex flex-col">
          <div className="flex flex-col gap-2 py-6">
          <div className="flex justify-center items-center relative">
              <img
                className="w-32 h-32 rounded-full object-cover p-[4px] bg-gradient-to-r from-[#f9f3e9] to-[#764B36]"
                src={
                  userImg
                    ? URL.createObjectURL(userImg)
                    : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                }
                alt="Profile"
              />
              <i
                className="fa-solid fa-pen-to-square absolute bottom-2 right-20 bg-[#f9f3e9] w-6 h-6 p-1.5 flex text-xs rounded-full cursor-pointer text-[#764B36]"
                // onClick={handleIconClick}
              ></i>
              <input
                type="file"
                className="hidden"
                // ref={fileInputRef}
                // onChange={handleUpload}

              />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold truncate">{user.name}</p>
              <p>Member since March 28</p>
            </div>
          </div>
          <ul className="flex flex-col gap-2 px-1">
            {[
              { label: "Profile", icon: <User size={18} />, key: "profile" },
              {
                label: "My Bookings",
                icon: <CalendarCheck size={18} />,
                key: "bookings",
              },
              { label: "Saved Cafes", icon: <Heart size={18} />, key: "saved" },
              {
                label: "Settings",
                icon: <Settings size={18} />,
                key: "settings",
              },
            ].map(({ label, icon, key }) => (
              <li
                key={key}
                style={{
                  backgroundColor:
                    activeSection === key ? "#F0BB92" : "transparent",
                }}
                className="flex items-center gap-2 pl-4 py-1 rounded cursor-pointer"
                onClick={() => setActiveSection(key)}
              >
                {icon} {label}
              </li>
            ))}
            <li
              className="flex items-center gap-2 pl-4 py-1 rounded cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
            >
              <LogOut size={18} /> Sign out
            </li>
          </ul>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-3/4 flex flex-col py-4 px-2 gap-2">
        {activeSection === "profile" && (
          <div>
            <p
              style={{ color: "#563C24" }}
              className="text-2xl font-semibold mt-4 mb-4 "
            >
              Profile
            </p>

            <div className="flex flex-col py-4 px-2 gap-5 bg-white rounded">
              <div className="flex w-full justify-between px-2">
                <p style={{ color: "#563C24" }} className="text-xl font-medium">
                  Personal Information
                </p>

                <button
                  onClick={toggleEdit}
                  style={{ backgroundColor: "#F4E7DD" }}
                  className="px-4 py-1 rounded cursor-pointer"
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>

              <div className="flex flex-col gap-4 pl-12">
                <div className="flex w-2/4 justify-between">
                  <div className="py-1 px-4 rounded w-[160px]">
                    <p style={{ color: "#9948127D" }} className="text-lg">
                      Full Name
                    </p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <p className="font-medium truncate">{user.name}</p>
                    )}
                  </div>

                  <div className="py-1 px-4 rounded w-[160px]">
                    <p style={{ color: "#9948127D" }} className="text-lg">
                      Email
                    </p>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <p className="font-medium truncate">{user.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex w-2/4 justify-between">
                  <div className="py-1 px-4 rounded w-[160px]">
                    <p style={{ color: "#9948127D" }} className="text-lg">
                      Phone
                    </p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <p className="font-medium">+91 {user.contactNo}</p>
                    )}
                  </div>

                  <div className="py-1 px-4 rounded w-[160px]">
                    <p style={{ color: "#9948127D" }} className="text-lg">
                      Address
                    </p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <p className="font-medium truncate">{user.location}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "bookings" && (
          <div>
            <h2 className="text-2xl font-semibold text-[#563C24] mb-4 mt-5">
              My Bookings
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-lg w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-medium">Bookings</h3>
                <button
                  onClick={() => navigate("/")}
                  className="bg-[#F4E7DD] px-4 py-2 rounded-lg text-sm cursor-pointer"
                >
                  Find new cafés
                </button>
              </div>

              {/* Scrollable container for bookings */}
              <div className="max-h-[550px] overflow-y-auto">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-start bg-gray-100 p-4 rounded-lg shadow-sm mb-4"
                  >
                    <div className="w-48 h-40 bg-gray-300 rounded-lg">
                      <img
                        src={booking.cafe.image}
                        alt="Cafe"
                        className="w-48 h-40 rounded-lg"
                      />
                    </div>
                    <div className="flex-1 ml-4">
                      <h4 className="text-lg font-semibold text-[#B35C34]">
                        {booking.cafe.name}
                      </h4>
                      <p className="text-gray-600 text-sm">📅 {booking.date}</p>
                      <p className="text-gray-700 text-sm">
                        Celebration:{" "}
                        <span className="font-medium">
                          {booking.partyType || "Not Defined"}
                        </span>
                      </p>
                      <p className="text-gray-700 text-sm">
                        Guests:{" "}
                        <span className="font-medium">
                          {booking.guests} people
                        </span>
                      </p>
                      <p className="text-gray-700 text-sm">
                        Amount:{" "}
                        <span className="font-medium">{booking.amount}</span>
                      </p>
                      <div className="flex gap-2 mt-3">
                        <button className="px-4 py-1 border rounded-lg cursor-pointer"   onClick={() => navigate(`/cafe/${booking.cafe._id}`)}>
                          View cafe
                        </button>
                        {booking.status === "Upcoming" && (
                          <>
                            <button className="px-4 py-1 border rounded-lg">
                              Modify
                            </button>
                            <button className="px-4 py-1 border rounded-lg text-red-600 bg-red-100">
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-lg  text-sm font-medium ${
                        booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : booking.status === "Confirmed"
                          ? "bg-green-100 text-green-600"
                          : booking.status === "Approved"
                          ? "bg-pink-100 text-pink-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                ))}
                <p>No cafes booked yet.</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === "saved" && <CafeList cafes={savecafe} onRemove={removeFromWishlist}  />}
        {activeSection === "settings" && (
          <>
            <AccountSettings />
          </>
        )}
      </div>
    </div>
  );
};



// Cafe Card Component
const CafeCard = ({ cafeid, name, location, rating, image, onRemove }) => {
  const navigate = useNavigate();

  return (
  <div className="flex justify-center">
    <div className="border border-[#E6B99D] rounded-xl p-4 shadow-sm w-[280px]">
      <div 
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} className="relative w-full h-[180px] bg-gray-200 rounded-lg">
        <div className="absolute top-2 left-2 bg-gray-100 p-2 rounded-full shadow-md">
          <Heart onClick={() => onRemove(cafeid)} size={16} className="text-gray-500 cursor-pointer" />
        </div>
      </div>
      <div className="mt-2">
        <h4 className="text-lg font-semibold text-[#B35C34]">{name}</h4>
        <p className="text-sm text-gray-600 flex items-center gap-1">
          <MapPin size={14} /> {location}
        </p>
        <p className="flex items-center gap-1 text-sm text-yellow-600">
          <Star size={14} /> {rating}
        </p>
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 border rounded-lg bg-[#F4E7DD] cursor-pointer"
            onClick={() => navigate(`/cafe/${cafeid}`)}
          >
            View Details
          </button>
          <button className="px-4 py-2 border rounded-lg bg-amber-900 text-white cursor-pointer"
          onClick={()=> navigate(`/cafe/${cafeid}/book`)}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

// Cafe List Section
const CafeList = ({ cafes = [], onRemove }) => (
  <div>
    <h2 className="text-2xl font-semibold text-[#563C24] mb-4 mt-5">
      Saved Cafes
    </h2>
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-medium mb-4">Cafe's</h2>

      {/* Scrollable container */}
      <div className="flex flex-wrap gap-16 justify-left overflow-y-auto max-h-[550px] pr-2">
        {cafes.length > 0 ? (
          cafes.map((cafe) => (
            <CafeCard
              key={cafe._id}
              cafeid={cafe._id}
              name={cafe.name}
              location={cafe.location}
              rating={cafe.rating}
              image={cafe.image}
              onRemove={onRemove}
            />
          ))
        ) : (
          <p>No cafes saved yet.</p>
        )}
      </div>
    </div>
  </div>
);

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlePasswordChange = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:4000/user/profile/change-password`,
        formData,
        {
          headers: { Authorization:`Bearer ${token}` },
        }
      );
      setSuccessMessage(response.data.message);
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to change password"
      );
      setSuccessMessage("");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/user/profile/delete-account`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Account deleted successfully.");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const DeleteModal = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;
    return (
      <div
        className="fixed inset-0  flex justify-center items-center z-50"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.80)" }}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md text-center">
          <img
            src={deleteImage}
            alt="Delete"
            className="mx-auto mb-4 w-32 h-24"
          />
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Are you sure you want to delete your account?
          </h2>
          <div className="flex justify-between gap-4">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
                onDelete();
                onClose();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  

     
  

  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#563C24] mb-4 mt-5">
        Setting
      </h2>
      <div className="bg-white p-6 rounded-xl">
        <h2 className="text-2xl font-semibold text-[#563C24]">
          Account Settings
        </h2>

        {/* Notification Preferences */}
        <div className="mt-4">
          <h3 className="font-semibold">Notification Preferences</h3>
          <div className="flex items-center justify-between pb-2">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-600">
                Receive booking confirmations and updates
              </p>
            </div>
            <input
              type="checkbox"
              className="form-checkbox text-[#F0BB92]"
              defaultChecked
            />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Promotional Emails</p>
              <p className="text-sm text-gray-600">
                Special offers and discounts
              </p>
            </div>
            <input
              type="checkbox"
              className="form-checkbox text-[#F0BB92]"
              defaultChecked
            />
          </div>
        </div>
        {/* Password & Security */}
        <div className="mt-4 border-t pt-4">
          <h3 className="font-semibold">Password & Security</h3>
          <button
            className="mt-2 px-4 py-2 bg-[#F0BB92] text-white rounded"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            Change Password
          </button>

          {showPasswordForm && (
            <form
              onSubmit={ handlePasswordChange}
              className="mt-4 p-4 border border-[#F0BB92] rounded-xl"
            >
              <h4 className="font-semibold text-[#563C24] mb-4 italic text-lg">
                Change Password
              </h4>

              <label className="block font-semibold text-[#563C24]">
                Old password
              </label>
              <input
                type="password"
                name="oldPassword"
                placeholder="Enter your old password"
                className="w-full mt-1 mb-4 p-2 bg-[#F4E7DD] rounded"
                value={formData.oldPassword}
                onChange={handleChange}
              />

              <label className="block font-semibold text-[#563C24]">
                New password
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter your new password"
                className="w-full mt-1 mb-4 p-2 bg-[#F4E7DD] rounded"
                value={formData.newPassword}
                onChange={handleChange}
              />

              <label className="block font-semibold text-[#563C24]">
                Confirm new password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your new password"
                className="w-full mt-1 mb-4 p-2 bg-[#F4E7DD] rounded"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-[#563C24] text-white rounded"
              >
                Update Password
              </button>
              {successMessage && (
                <p className="text-green-600 mt-2">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="text-red-600 mt-2">{errorMessage}</p>
              )}
            </form>
          )}
        </div>

        {/* Danger Zone */}
        <div className="mt-4 border-t pt-4">
          <h3 className="font-semibold text-red-600">Danger Zone</h3>
          <p className="text-sm text-gray-600">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button
            className="mt-2 px-4 py-2 bg-[#F4E7DD] text-red-600 rounded"
            onClick={() => setShowModal(true)}
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onDelete={handleDeleteAccount}
      />
    </div>
  );
};

export default Profileuser;