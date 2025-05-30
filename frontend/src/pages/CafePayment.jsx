import React, { useState, useEffect } from "react";
// import cafeLogo from "../assets/cafe-logo.jpg";
// import orderBanner from "../assets/cafe-banner.jpg";
import { useNavigate, useParams } from "react-router-dom";
//  import successVideo from "../assets/successful-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--complete-done-success-tick-pulsing-circle-status-pack-user-interface-icons-8403662-vmake-vmake (online-video-cutter.com).mp4";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function CafePaymentPage() {
  const [formData, setFormData] = useState({ email: "", mobile: "", name: "" });
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState({
    id: null,
    amount: 0,
    item: "",
    image: "",
    details: "",
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    setOrder({
      id: localStorage.getItem("selectedOrderId"),
      amount: parseInt(localStorage.getItem("selectedOrderAmount"), 10) || 0,
      item: localStorage.getItem("selectedOrderItem"),
      // image: localStorage.getItem("selectedOrderImage") || orderBanner,
      details: localStorage.getItem("selectedOrderDetails"),
    });
  }, []);

  const [bookingData, setBookingData] = useState({});
  const id = useParams();
  const [cafeName, setCafeName] = useState('');
  const [tableCharge, setTableCharge] = useState('');
  const [cafeImage, setCafeImage] = useState('');
  const [userEmail, setUserEmail] = useState('');

  console.log(id.bookingId);
  useEffect(() => {
    const fetchBooking = async () => {
        console.log("hello");
      try {
        const res = await axios.get(`https://cafesphere-2-backend.onrender.com/user/booking/${id.bookingId}`);
        const booking = res.data.booking;
        setCafeName(booking.cafe.name);
        setTableCharge(booking.cafe.tableCharge);
        setCafeImage(booking.cafe.image);
        setUserEmail(booking.email);

        // console.log(res.data.booking.cafe);
        // console.log(res.data.booking.cafe.name);
        // console.log(res.data.booking.cafe.tableCharge);
        // console.log(res.data.booking.cafe.image);
        // console.log(res.data.booking.email);
        setBookingData(res.data);
        // console.log(bookingData.cafe);
      } catch (err) {
        console.error("Error fetching booking:", err);
      }
    };

    fetchBooking();
  }, [id.bookingId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

//   const validateForm = () => {
//     let formErrors = {};
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       formErrors.email = "Please enter a valid email.";
//     }
//     if (!/^\d{10}$/.test(formData.mobile)) {
//       formErrors.mobile = "Mobile must be 10 digits.";
//     }
//     if (formData.name.trim() === "") {
//       formErrors.name = "Name is required.";
//     }
//     setErrors(formErrors);
//     return Object.keys(formErrors).length === 0;
//   };

  const loadRazorpay = async () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
      } else {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      }
    });
  };

  const handlePayment = async () => {
    // if (!validateForm()) return;

    const razorpayLoaded = await loadRazorpay();
    if (!razorpayLoaded) {
      alert("Failed to load Razorpay.");
      return;
    }

    const options = {
      key: "rzp_test_ljV4ezmAEzgsLG", // Replace with your own
      amount: tableCharge * 100,
      currency: "INR",
      name: "CaféSphere",
      description: "Order Payment",
      // image: cafeLogo,
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.mobile,
      },
      theme: { color: "#a0522d" },
      handler: async (response) => {
        const transactionData = {
          email: formData.email,
          mobile: formData.mobile,
          name: formData.name,
          amount: tableCharge*100,
          orderId: order.id,
        };

        const token = localStorage.getItem("authToken");

        try {
          const res = await fetch("https://cafesphere-2-backend.onrender.com/payment/create-order", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(transactionData),
          });

          const data = await res.json();
          if (res.ok) {
            setShowModal(true);
            toast.success("Payment Successful!");
            console.log(res);
            console.log(res.data);
            setTimeout(generatePDF, 300);
          } else {
            alert(`Order not recorded: ${data.message}`);
          }
        } catch (error) {
          console.error("Recording error:", error);
          alert("Payment was successful but order not recorded.");
        }
      },
      modal: {
        ondismiss: () => alert("Payment cancelled."),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const generatePDF = () => {
    const input = document.getElementById("bill-template");
    if (!input) return;

    input.style.display = "block";

    setTimeout(() => {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgHeight = (canvas.height * 210) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 10, 210, imgHeight);
        pdf.save(`CafeSphere_Receipt_${Date.now()}.pdf`);
        input.style.display = "none";
      });
    }, 200);
  };

  return (
    <div className="container mx-auto py-10">
      <ToastContainer />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="col-span-2 space-y-5">
          {/* <img src={cafeLogo} alt="CaféSphere Logo" className="w-40 mb-3" /> */}
          <h2 className="text-2xl font-semibold text-gray-900">{order.item}</h2>
          <div className="bg-white p-6 rounded-lg max-w-md">
            <img src={cafeImage} alt="Order" className="w-full h-60 object-cover rounded-md mb-4" />
            <p className="text-gray-600 mt-2">{cafeName}</p>
          </div>
        </div>

        <div>
          <div className="bg-gray-100 p-5 rounded-lg shadow-lg">
            <h5 className="text-[#5c3317] text-lg font-semibold">Order Details</h5>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold">Amount</label>
                <input type="text" value={`₹${tableCharge || "0"}`} readOnly className="w-full p-3 border border-gray-300 rounded-lg mt-2" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                <input type="email" id="email" value={userEmail} readOnly onChange={handleChange} placeholder="Enter your email" className="w-full p-3 border border-gray-300 rounded-lg mt-2" />
                {errors.email && <small className="text-red-500">{errors.email}</small>}
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-semibold">Phone</label>
                <input type="text" id="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter your phone" className="w-full p-3 border border-gray-300 rounded-lg mt-2" />
                {errors.mobile && <small className="text-red-500">{errors.mobile}</small>}
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold">Full Name</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" className="w-full p-3 border border-gray-300 rounded-lg mt-2" />
                {errors.name && <small className="text-red-500">{errors.name}</small>}
              </div>
              <button onClick={handlePayment} className="w-full py-3 bg-brown-600 text-white rounded-lg hover:bg-brown-700">
                Pay ₹{tableCharge || "0"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <video autoPlay loop className="w-32 mx-auto">
              {/* <source src={successVideo} type="video/mp4" /> */}
            </video>
            <h2 className="text-lg font-semibold mt-4">Payment Successful!</h2>
            <p>Your order has been placed successfully.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <button onClick={generatePDF} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Download Bill</button>
              <button onClick={() => navigate("/")} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Go to Home</button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Bill Template */}
      <div
        id="bill-template"
        className="bg-white p-6 w-[50%] text-sm text-black border border-gray-300 shadow-lg rounded-lg"
        style={{ display: "none", position: "absolute", top: "-9999px", left: "-9999px" }}
      >
        <div className="text-center mb-6">
          {/* <img src={cafeLogo} alt="CaféSphere Logo" className="w-24 mx-auto mb-4" /> */}
          <h2 className="text-2xl font-bold text-brown-600">CaféSphere Order Receipt</h2>
        </div>

        <div className="mb-6">
          <div className="flex justify-between border-b border-gray-300 pb-2 mb-4">
            <p><strong>Item:</strong> {order.item}</p>
            <p><strong>Amount Paid:</strong> ₹{order.amount}</p>
          </div>
          <div className="flex justify-between border-b border-gray-300 pb-2 mb-4">
            <p><strong>Details:</strong> {order.details}</p>
            <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
          </div>
        </div>

        <div className="mb-6">
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.mobile}</p>
        </div>

        <div className="mt-6 border-t border-gray-300 pt-4">
          <p className="text-center text-xs text-gray-500">Thank you for ordering with CaféSphere!</p>
        </div>
      </div>
    </div>
  );
}

export default CafePaymentPage;