import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Contact } from 'lucide-react'
import "./scrollSlider.css";

const Home = () => {

  const navigate = useNavigate()
   

  const [cafes, setCafes] = useState([])
  const token=localStorage.getItem("token");
  const [liked, setLiked] = useState(false);
  let [cafeByCategory, setCafeCategory] = useState([]);
  const {id} = useParams();
  console.log(token)
  useEffect(() => {
    axios
      .get("http://localhost:4000/cafe/location/cafes", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log("Fetched Data:", response.data);
        
        // Make sure you're setting the array, not the whole object
        setCafes(Array.isArray(response.data) ? response.data : response.data.cafes);
      })
      .catch(error => {
        console.log("Error fetching data", error);
      });
  }, []);
  

  const [likedCafes, setLikedCafes] = useState({});

const handleHeartClick = (e, cafeId) => {
  e.stopPropagation(); 
  setLikedCafes((prev) => ({
    ...prev,
    [cafeId]: !prev[cafeId],
  }));
  savecafetowishlist(cafeId);
};

const savecafetowishlist = async (cafeId) => {
  try {
    const response = await 
    axios.post(
      "http://localhost:4000/user/save-cafe",
      { cafeId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error saving cafe to wishlist:", error.response?.data || error.message);
  }
};


    const handleCategoryClick = (category) => {
    navigate(`/${encodeURIComponent(category)}`);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value.trim();
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const saveCafeToWishlist = async (cafeId) => {
    try{
      const response = await axios.post(`http://localhost:4000/user/save-cafe`, {cafeId},
        {
          headers: { Authorization: `Bearer ${token} `},
        }
      )
      console.log(response.data);
      
    }catch(err){
      console.log(err.message);

    } 
    
  }

  return (
    <div className='flex flex-col items-center gap-8 py-8'>
        <p className='text-4xl mt-16'>Gather, Toast, Enjoy</p>
        <form onSubmit={handleSearch} className='flex'>
        <button>
        <i  className="fa-solid fa-magnifying-glass relative left-7 cursor-pointer"></i>
        </button>
        <input  type="text" className='h-12 w-3/3 p-2 rounded-2xl pl-10' placeholder='Search your favourite Cafe' name='search' style={{backgroundColor: "#d9d9d9", border: "1px solid #ccc"}}/>
        </form>
         
        {/* <div className="flex flex-wrap justify-center gap-8 px-4">
  {[
    {
      title: "Birthday",
      img: "https://i.pinimg.com/originals/b1/fd/d2/b1fdd2d1d7eefbe36873d6a14c6f32b2.jpg",
    },
    {
      title: "Farewell",
      img: "https://images.stockcake.com/public/8/8/4/88493bbf-a6d0-4af1-a03f-848961aabd28_large/cafe-group-meeting-stockcake.jpg",
    },
    {
      title: "RomanticDinner",
      img: "https://media-cdn.tripadvisor.com/media/photo-s/26/cf/ec/99/musafir-cafe-by-the-vintage.jpg",
    },
    {
      title: "Anniversary",
      img: "https://jolevents.in/cdn/shop/products/anniversarysurprisenew.jpg?v=1670433512&width=533",
    },
    {
      title: "Graduation",
      img: "https://img.freepik.com/premium-photo/happy-couple-celebrating-their-engagement-cafe-hugging-tightly_926199-3054610.jpg",
    },
  ].map((item, index) => (
    <div
    onClick={() => handleCategoryClick(item.title)}
    key={index} className="w-[40vw] sm:w-[25vw] md:w-[17vw] text-center cursor-pointer">
      <img
        src={item.img}
        alt={item.title}
        className="rounded-full w-full h-[35vw] sm:h-[25vw] md:h-[17vw] object-cover"
      />
      <p className="font-medium pt-2 text-sm sm:text-base">{item.title}</p>
    </div>
  ))}
</div> */}
 <div className="overflow-hidden w-full">
        <div className="scroll-slide gap-8 px-4">
          {[
            {
              title: "Birthday",
              img: "https://i.pinimg.com/originals/b1/fd/d2/b1fdd2d1d7eefbe36873d6a14c6f32b2.jpg",
            },
            {
              title: "CasualMeetup",
              img: "https://images.stockcake.com/public/8/8/4/88493bbf-a6d0-4af1-a03f-848961aabd28_large/cafe-group-meeting-stockcake.jpg",
            },
            {
              title: "OfficeParties",
              img: "https://media-cdn.tripadvisor.com/media/photo-s/26/cf/ec/99/musafir-cafe-by-the-vintage.jpg",
            },
            {
              title: "Anniversary",
              img: "https://jolevents.in/cdn/shop/products/anniversarysurprisenew.jpg?v=1670433512&width=533",
            },
            {
              title: "Engagement",
              img: "https://img.freepik.com/premium-photo/happy-couple-celebrating-their-engagement-cafe-hugging-tightly_926199-3054610.jpg",
            },
            {
              title: "Farewell",
              img: "https://img.freepik.com/premium-photo/people-having-farewell-party-cafe_23-2148477338.jpg",
            },
            {
              title: "CorporateEvent",
              img: "https://img.freepik.com/premium-photo/business-people-meeting-cafe_23-2148477338.jpg",
            },
            {
              title: "FriendsReunion",
              img: "https://img.freepik.com/premium-photo/friends-reunion-cafe_23-2148477338.jpg",
            },
            {
              title: "Family Get Together",
              img: "https://img.freepik.com/premium-photo/family-gathering-cafe_23-2148477338.jpg",
            },
            {
              title: "Graduation",
              img: "https://img.freepik.com/premium-photo/people-celebrating-graduation-party-cafe_23-2148477338.jpg",
            },
            {
              title: "Surprise",
              img: "https://img.freepik.com/premium-photo/surprise-party-cafe_23-2148477338.jpg",
            },
            {
              title: "Date night",
              img: "https://img.freepik.com/premium-photo/romantic-date-cafe_23-2148477338.jpg",
            },
            {
              title: "Romantic dinner",
              img: "https://img.freepik.com/premium-photo/friends-having-brunch-cafe_23-2148477338.jpg",
            },
            {
              title: "Kids party",
              img: "https://img.freepik.com/premium-photo/friends-having-lunch-cafe_23-2148477338.jpg",
            },
            {
              title: "Dinner",
              img: "https://img.freepik.com/premium-photo/friends-having-dinner-cafe_23-2148477338.jpg",
            },
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(item.title)}
              className="w-[40vw] sm:w-[25vw] md:w-[17vw] text-center shrink-0 mx-2"
            >
              <img
                src={item.img}
                alt={item.title}
                className="rounded-full w-full h-[35vw] sm:h-[25vw] md:h-[17vw] object-cover"
              />
              <p className="font-medium pt-2 text-sm sm:text-base">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
        <div style={{backgroundColor: "#f9f3e9", "display": "grid",
  "grid-template-columns": "repeat(auto-fill, minmax(280px, 1fr))" ,
  "gap": "20px", 
  "padding": "20px"}} className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 p-3'>
            {
           Array.isArray(cafes) && cafes.map((cafe) => (
            <div
              key={cafe._id}
              onClick={() => navigate(`/cafe/${cafe._id}`)}
              className="relative w-full bg-white p-3 rounded-xl flex-col px-5 cursor-pointer group h-[260px]"
            >
              <img className="h-[70%] w-full rounded group-hover:opacity-65 transition-opacity duration-500" src={cafe.image} alt="" />
              <p className="pt-2 font-medium text-xl text-zinc-800">{cafe.name}</p>
              <p className="text-gray-500 truncate">{cafe.location}, {cafe.city}</p>
              
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
            
            {/* <div className='w-full bg-white p-3 rounded-xl flex-col px-5 cursor-pointer'>
              <img className='h-[70%] w-full rounded' src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FmZXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
              <p className='pt-2 font-medium text-xl text-zinc-800'>Sangam Cafe</p>
              <p className='text-gray-500'>Bhel colony, near piplani, Bhopal</p>
            </div>
            <div className='w-full bg-white p-3 rounded-xl flex-col px-5 cursor-pointer'>
            <img className='h-[70%] w-full rounded' src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhZmV8ZW58MHx8MHx8fDA%3D" alt="" />
              <p className='pt-2 font-medium text-xl text-zinc-800'>Royal Cafe</p>
              <p className='text-gray-500'>AnandNagar, Bhopal</p>
            </div>
            <div className='w-full bg-white p-3 rounded-xl flex-col px-5 cursor-pointer'>
            <img className='h-[70%] w-full rounded' src="https://plus.unsplash.com/premium_photo-1663932464937-e677ddfc1d55?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNhZmV8ZW58MHx8MHx8fDA%3D" alt="" />
              <p className='pt-2 font-medium text-xl text-zinc-800'>Sagar Gaire</p>
              <p className='text-gray-500'>Bhavani dham, Narela, Bhopal</p>
            </div>
            <div className='w-full bg-white p-3 rounded-xl flex-col px-5 cursor-pointer'>
            <img className='h-[70%] w-full rounded' src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhZmV8ZW58MHx8MHx8fDA%3D" alt="" />
              <p className='pt-2 font-medium text-xl text-zinc-800'>Momo cafe</p>
              <p className='text-gray-500'>DB city, Arera hills, Bhopal</p>
            </div>
            <div className='w-full bg-white p-3 rounded-xl flex-col px-5 cursor-pointer'>
            <img className='h-[70%] w-full rounded' src="https://images.unsplash.com/photo-1463797221720-6b07e6426c24?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGNhZmV8ZW58MHx8MHx8fDA%3D" alt="" />
              <p className='pt-2 font-medium text-xl text-zinc-800'>Bake N Shake</p>
              <p className='text-gray-500'>Rangmahal Cineplex, Bhopal</p>
            </div>
            <div className='w-full bg-white p-3 rounded-xl flex-col px-5 cursor-pointer'>
            <img className='h-[70%] w-full rounded' src="https://images.unsplash.com/photo-1542181961-9590d0c79dab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGNhZmV8ZW58MHx8MHx8fDA%3D" alt="" />
              <p className='pt-2 font-medium text-xl text-zinc-800'>Cafe-Chino</p>
              <p className='text-gray-500'>Jehen-numa palace, Bhopal</p>
            </div>
            <div className='w-full bg-white p-3 rounded-xl flex-col px-5 cursor-pointer'>
            <img className='h-[70%] w-full rounded' src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNhZmV8ZW58MHx8MHx8fDA%3D" alt="" />
              <p className='pt-2 font-medium text-xl text-zinc-800'>Green House Bistro</p>
              <p className='text-gray-500'>Near van vihar, Bhopal</p>
            </div>
            <div className='w-full bg-white p-3 rounded-xl flex-col px-5 cursor-pointer'>
            <img className='h-[70%] w-full rounded' src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGNhZmV8ZW58MHx8MHx8fDA%3D" alt="" />
              <p className='pt-2 font-medium text-xl text-zinc-800'>ShahNama</p>
              <p className='text-gray-500'>6 Manohar Hamidia Road, Bhopal</p>
            </div> */}
        </div>
        <div className='flex-col w-full px-4 py-1'>
          <div className='w-2/4 bg-gray-100 mt-3 p-4 rounded-xl font-medium cursor-pointer'>
            <p><i>Popular Cafe's Near Me</i></p>
          </div>
          <div className='w-2/4 bg-gray-100 mt-3 p-4 rounded-xl font-medium cursor-pointer'>
          <p><i>Top rated Cafe's</i></p>
          </div>
          <div className='w-2/4 bg-gray-100 mt-3 p-4 rounded-xl font-medium cursor-pointer'>
          <p><i>Cafe's for Birthday Parties</i></p>
          </div>
          <div className='w-2/4 bg-gray-100 mt-3 p-4 rounded-xl font-medium cursor-pointer'>
          <p><i>Roof-Top Cafe's</i></p>
          </div>
        </div>
        <div className='bg-gray-100 w-[95vw] p-5 rounded-xl text-center'>
          <p className='font-medium text-xl'><i>Want to get more bookings and hype of your own cafe ??</i></p>
          <p className='font-medium text-2xl mt-4 text-zinc-700'>Get More Bookings, Gain More Visibility – Join Our Cafe Network!</p>
          <button onClick={() => navigate("/add-cafe")} className='text-white py-3 rounded-3xl mt-4 text-m font-medium cursor-pointer px-5' style={{backgroundColor: "#f5a25d"}}>Register as a Cafe Owner Now</button>
        </div>
    </div>
  )
}

export default Home