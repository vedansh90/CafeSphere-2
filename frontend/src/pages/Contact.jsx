import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 font-[Inter]">
      {/* Left Image */}
      <div className="md:w-1/2 w-full h-64 md:h-auto">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1050&q=80"
          alt="Cafe Contact"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form with glassmorphism */}
      <div className="md:w-1/2 w-full p-6 sm:p-10 lg:p-16 flex flex-col justify-center bg-white/30 backdrop-blur-md shadow-xl">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Let’s Connect</h2>
        <p className="text-gray-600 mb-6 text-lg">We’re brewing ideas with love. Drop us a message!</p>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-5 py-3 bg-white/70 rounded-xl border outline-none shadow-sm focus:ring-2 focus:ring-[#FF7F50]"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-5 py-3 bg-white/70 rounded-xl border outline-none shadow-sm focus:ring-2 focus:ring-[#FF7F50]"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full px-5 py-3 bg-white/70 rounded-xl border outline-none shadow-sm focus:ring-2 focus:ring-[#FF7F50] resize-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-[#FF7F50] hover:bg-[#e56b3b] text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Social Media */}
        <div className="flex justify-center gap-6 mt-10 text-gray-700 text-2xl">
          <a href="#" className="hover:text-[#4267B2] transition"><FaFacebook /></a>
          <a href="#" className="hover:text-[#E1306C] transition"><FaInstagram /></a>
          <a href="#" className="hover:text-[#1DA1F2] transition"><FaTwitter /></a>
          <a href="#" className="hover:text-[#0077b5] transition"><FaLinkedin /></a>
        </div>
      </div>
    </div>
  );
};

export default Contact;