import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const SearchCafe = () => {

    const [cafes, setCafes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const searchQuery = searchParams.get('q') || '';

    useEffect(() => {
        const fetchCafes = async () => {
          setLoading(true);
          try {
            const res = await fetch(`https://cafesphere-2-backend.onrender.com/cafe/?search=${searchQuery}`);
            const data = await res.json();
            setCafes(data);
            console.log(data);
          } catch (err) {
            console.error("Search failed:", err);
          } finally {
            setLoading(false);
          }
        };
    
        if (searchQuery) fetchCafes();
      }, [searchQuery]);

      const [likedCafes, setLikedCafes] = useState({});
      
      const handleHeartClick = (e, cafeId) => {
        e.stopPropagation(); 
        setLikedCafes((prev) => ({
          ...prev,
          [cafeId]: !prev[cafeId],
        }));
        savecafetowishlist(cafeId);
      };
      

  return (
    <div style={{backgroundColor: "#f9f3e9", "display": "grid",
        "grid-template-columns": "repeat(auto-fill, minmax(280px, 1fr))" ,
        "gap": "20px", 
        "padding": "20px"}} className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 p-3 mt-5'>
        {
              cafes.map((cafe, index) => (
                <div
              key={cafe._id}
              onClick={() => navigate(`/cafe/${cafe._id}`)}
              className="relative w-full bg-white p-3 rounded-xl flex-col px-5 cursor-pointer group h-[260px]"
            >
              <img className="h-[70%] w-full rounded group-hover:opacity-65 transition-opacity duration-500" src={cafe.image} alt="" />
              <p className="pt-2 font-medium text-xl text-zinc-800">{cafe.name}</p>
              <p className="text-gray-500">{cafe.location}, {cafe.city}</p>
              
              {/* Wishlist Heart Button */}
              <div className="absolute top-4 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button onClick={(e) => handleHeartClick(e, cafe._id)}>
                  <i className={`fa-${likedCafes[cafe._id] ? "solid" : "regular"} fa-heart text-${likedCafes[cafe._id] ? "red-500" : "black"}`} />
                </button>
              </div>
          
              <button className="absolute bottom-12 right-5 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer" style={{ backgroundColor: "#764B36" }}>
                Book now
              </button>

              <div className="flex justify-end mb-4 absolute bottom-0 right-5">
            <span
              className={`px-2.5 rounded text-sm font-stretch-90% ${
                cafe.isOpen
                  ? 'border border-green-300 text-green-500'
                  : 'border border-red-300 text-red-500'
              }`}
            >
              {cafe.isOpen ? 'Open' : 'Closed'}
            </span>
          </div>

            </div>
              ))
        }
    </div>
  )
}

export default SearchCafe