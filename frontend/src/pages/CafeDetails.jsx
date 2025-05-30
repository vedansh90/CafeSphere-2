import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const CafeDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("menu");
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  let [cafe, setCafe] = useState({});
  const [comment, setComment] = useState("");
  const [star, setStar] = useState(0); // star rating from 1 to 5
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCafeDetails = async () => {
      try {
        const response = await axios.get(`https://cafesphere-2-backend.onrender.com/cafe/${id}`);
        setCafe(response.data);
        console.log("id", id);
      } catch (error) {
        console.error("Error fetching cafe details:", error);
      }
    };

    fetchCafeDetails();
  }, [id]);
  const menu = [...(cafe.menu || [])];
  const drink = [...(cafe.drink || [])];

  while (menu.length < 4) {
    menu.push({ itemName: "Coming soon", price: "XXX" });
  }
  while (drink.length < 4) {
    drink.push({ itemName: "Coming soon", price: "XXX" });
  }

  // Dummy photos and reviews (replace with your real data)
  const photos = cafe.photos || [
    cafe.image,
    cafe.image,
    cafe.image,
    cafe.image,
  ];
  // const reviews = cafe.reviews || [
  // { id: 1, user: "Alice", comment: "Great cafe!", rating: 5 },
  // { id: 2, user: "Bob", comment: "Nice ambience", rating: 4 },
  // { id: 3, user: "Charlie", comment: "Loved the coffee", rating: 5 },
  // ];

  while (menu.length < 4) {
    menu.push({ itemName: "Coming soon", price: "XXX" });
  }

  while (drink.length < 4) {
    drink.push({ itemName: "Coming soon", price: "XXX" });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (star === 0) {
      alert("Please select a star rating");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // or wherever you store your token
      console.log("id", id);
      await axios.post(
        "http://localhost:4000/review/add-review",
        {
          comment,
          rating: star,
          cafeId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Review submitted!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  const [reviewData, setReviewdata] = useState([]);

  useEffect(() => {
  const fetchReviews = async () => {
    try {
      console.log("id", id);
      const response = await axios.get(`https://cafesphere-2-backend.onrender.com/review/${id}`);
       if (Array.isArray(response.data.reviews)) {
        setReviewdata(response.data.reviews);
        console.log("Reviews:", response.data.reviews);
      } else {
        console.warn("Expected an array but got:", response.data.reviews);
        setReviewdata([]); // fallback
      }
    } catch (error) {
      console.error("Error fetching cafe reviews:", error);
    }
  };

  if (id) {
    fetchReviews();
  }
}, [id]);

useEffect(() => {
  console.log("Updated reviewData:", reviewData);
}, [reviewData]);

  return (
    <div>
      {/* image section */}
      <div
        style={{
          backgroundImage: `url(${cafe?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-[45vh] bg-black text-white flex justify-between "
      >
        {/* left */}
        <div className="flex flex-col justify-end p-4 pl-6">
          <span
            style={{ backgroundColor: "#D97707" }}
            className="bg-white rounded-full text-white p-2 w-1/2 pl-3 text-sm font-medium"
          >
            Featured
          </span>
          <span className="text-3xl font-bold">{cafe.name}</span>
          <span>({reviewData.length || "12"} reviews)</span>
        </div>
        {/* right */}

        <div className="flex flex-col justify-end">
          <div className="px-2 py-2 bg-[#f9f3e9] rounded-2xl flex gap-2 items-center  ">
            <p className="text-[#764B36]">Table Charges: </p>
            <p className="text-[#764B36]">
              {cafe.tableCharge}
            </p>
          </div>
          <button
            onClick={() => navigate(`/cafe/${id}/book`)}
            style={{ backgroundColor: "#FD8403" }}
            className="px-10 py-2 font-medium text-white rounded-2xl cursor-pointer text-xl m-4 bg-white"
          >
            Book Now
          </button>
        </div>
      </div>
      {/* main section */}
      <div style={{ backgroundColor: "#F4E7DD" }} className="flex">
        {/* left */}
        <div className="w-2/3 px-7">
          {/* location, hours, etx */}
          <div className="flex justify-between py-3 gap-4">
            <div className="flex gap-2 items-center border border-b-black p-2 bg-white rounded-2xl w-1/3">
              <div
                style={{ backgroundColor: "#FBBE24D9", color: "#FD8403" }}
                className=" w-7 h-7 rounded-full text-center text-sm pt-1"
              >
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <p className="text-sm">Location</p>
                <p className="text-sm font-medium">
                  {cafe.location}, {cafe.city}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center border border-b-black p-2 bg-white rounded-2xl w-1/3">
              <div
                style={{ backgroundColor: "#FBBE24D9", color: "#FD8403" }}
                className=" w-7 h-7 rounded-full text-center text-sm pt-1"
              >
                <i class="fa-solid fa-clock"></i>
              </div>
              <div>
                <p className="text-sm">Hours</p>
                <p className="text-sm font-medium">8:00 AM - 8:00PM</p>
              </div>
            </div>
            <div className="flex gap-2 items-center border border-b-black p-2 bg-white rounded-2xl w-1/3">
              <div
                style={{ backgroundColor: "#FBBE24D9", color: "#FD8403" }}
                className=" w-7 h-7 rounded-full text-center text-sm pt-1"
              >
                <i class="fa-solid fa-phone"></i>
              </div>
              <div>
                <p className="text-sm">Contact</p>
                <p className="text-sm font-medium">{cafe.contactNo}</p>
              </div>
            </div>
          </div>
          {/* about */}
          <div>
            <p className="text-3xl font-medium">About</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores ipsam voluptate aliquam doloribus vel non fuga corporis
              odio nisi mollitia? Ratione deleniti ea saepe. At quis rem
              praesentium laboriosam quod? Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Impedit esse sit, eligendi eum
              praesentium officia soluta nihil adipisci magnam non laborum
              corporis alias odio doloremque mollitia in illo et ad!
            </p>
            <div className="flex justify-evenly border border-b-black w-3/4 py-4 mt-3 rounded">
              <div className="text-center">
                <div
                  style={{ backgroundColor: "#E79C1A" }}
                  className="w-16 h-16 rounded-full items-center flex justify-center"
                >
                  <i
                    style={{ fontSize: "30px", opacity: "0.7" }}
                    class="fa-solid fa-wifi"
                  ></i>
                </div>
                <p className="text-sm">Wifi</p>
              </div>
              <div className="text-center">
                <div
                  style={{ backgroundColor: "#E79C1A" }}
                  className="w-16 h-16 rounded-full items-center flex justify-center"
                >
                  <i
                    style={{ fontSize: "30px", opacity: "0.7" }}
                    class="fa-solid fa-square-parking"
                  ></i>
                </div>
                <p className="text-sm">Parking</p>
              </div>
              <div className="text-center">
                <div
                  style={{ backgroundColor: "#E79C1A" }}
                  className="w-16 h-16 rounded-full items-center flex justify-center"
                >
                  <i
                    style={{ fontSize: "30px", opacity: "0.7" }}
                    class="fa-solid fa-music"
                  ></i>
                </div>
                <p className="text-sm">Music</p>
              </div>
              <div className="text-center">
                <div
                  style={{ backgroundColor: "#E79C1A" }}
                  className="w-16 h-16 rounded-full items-center flex justify-center"
                >
                  <i
                    style={{ fontSize: "30px", opacity: "0.7" }}
                    class="fa-solid fa-chair"
                  ></i>
                </div>
                <p className="text-sm">Outdoor Seating</p>
              </div>
            </div>
          </div>
          {/* slider */}

          <div
            style={{ backgroundColor: "#E7E0E0" }}
            className="flex py-2 p-1 px-2 rounded my-2 justify-between gap-3"
          >
            {["menu", "photos", "reviews"].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-1/4 p-2 rounded-xl text-center font-medium cursor-pointer ${
                  activeTab === tab ? "bg-white" : "bg-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </div>
            ))}
          </div>

          {/* foods */}
          <div>
            {activeTab === "menu" && (
              <>
                {/* Food Section */}
                <div className="flex flex-col py-3">
                  <div className="flex gap-2 items-center py-1">
                    <i className="fa-solid fa-utensils"></i>
                    <p className="text-2xl font-medium">
                      <i>Food</i>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {menu.slice(0, 4).map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between border border-black rounded px-2 py-2"
                      >
                        <div className="flex flex-col gap-2 w-3/4">
                          <p className="font-medium">
                            <i>{item.itemName}</i>
                          </p>
                          <p className="text-sm">
                            All kind of pizza’s with extra toppings
                          </p>
                        </div>
                        <div>
                          <p
                            style={{ color: "#FD8403" }}
                            className="font-medium text-sm"
                          >
                            Rs. {item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Drinks Section */}
                <div className="flex flex-col py-3">
                  <div className="flex gap-2 items-center py-1">
                    <i className="fa-solid fa-utensils"></i>
                    <p className="text-2xl font-medium">
                      <i>Drinks</i>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {drink.slice(0, 4).map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between border border-black rounded px-2 py-2"
                      >
                        <div className="flex flex-col gap-2 w-3/4">
                          <p className="font-medium">
                            <i>{item.itemName}</i>
                          </p>
                          <p className="text-sm">All kind of cold drinks</p>
                        </div>
                        <div>
                          <p
                            style={{ color: "#FD8403" }}
                            className="font-medium text-sm"
                          >
                            Rs. {item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            {activeTab === "photos" && (
              <div className="grid grid-cols-2 gap-4 p-4">
                {photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt={`Cafe photo ${idx + 1}`}
                    className="rounded-lg object-cover h-48 w-full"
                  />
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Comment:</label>
                  <br />
                  <textarea
                    placeholder="Write your comment here"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    rows={4}
                    cols={40}
                  />
                </div>

                <div style={{ marginTop: "10px" }}>
                  <label>Star Rating:</label>
                  <br />
                  {[1, 2, 3, 4, 5].map((num) => (
                    <label key={num} style={{ marginRight: 10 }}>
                      <input
                        type="radio"
                        name="star"
                        value={num}
                        checked={star === num}
                        onChange={() => setStar(num)}
                        required
                      />
                      {num} ⭐
                    </label>
                  ))}
                </div>

                <br />
                <button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            )}

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
              {reviewData.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                reviewData.map((review) => (
                  <div
                    key={review.id || review._id}
                    className="border-b border-gray-300 py-3"
                  >
                    <p className="font-medium">
                      {review.user.name || "Anonymous"}
                    </p>
                    <p>{review.comment}</p>
                    <p>
                      {Array.from({ length: review.rating }, (_, i) => (
                        <span key={i} style={{ color: "#FD8403" }}>
                          ⭐
                        </span>
                      ))}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {/* right */}
        <div className="w-1/3 px-2 py-0.5">
          {/* direction */}
          <div className="h-[20vh] border border-black rounded">
            <div className="bg-black h-[30vh]">
              <img className="w-full h-full" src={cafe.image} alt="" />
            </div>
            <div className="bg-white px-2 h-2/3 rounded">
              <p className="font-medium">{cafe.name}</p>
              <p className="text-sm">
                {cafe.location}, {cafe.city}
              </p>
              <button
                onClick={() => {
                  const name = cafe.name || "";
                  const location = cafe.location || "";
                  const city = cafe.city || "";
                  const query = encodeURIComponent(
                    `${name}`,
                    `${location}`,
                    `${city}`
                  );
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${query}`,
                    "_blank"
                  );
                }}
                className="w-full text-lg my-1 bg-black text-white font-medium rounded py-0.5 cursor-pointer"
              >
                Get Directions
              </button>
            </div>
          </div>

          {/* hours of operation */}
          <div className="flex flex-col justify-between p-4 text-sm h-[40vh] border border-black rounded mt-38">
            <p className="text-2xl font-medium">Hours of Operation</p>
            <div className="flex justify-between">
              <p>Monday</p>
              <p>8:00AM - 8:00PM</p>
            </div>
            <div className="flex justify-between">
              <p>Tuesday</p>
              <p>8:00AM - 8:00PM</p>
            </div>
            <div className="flex justify-between">
              <p>Wednesday</p>
              <p>8:00AM - 8:00PM</p>
            </div>
            <div className="flex justify-between">
              <p>Thrusday</p>
              <p>8:00AM - 8:00PM</p>
            </div>
            <div className="flex justify-between">
              <p>Friday</p>
              <p>8:00AM - 8:00PM</p>
            </div>
            <div className="flex justify-between">
              <p>Saturday</p>
              <p>8:00AM - 8:00PM</p>
            </div>
            <div className="flex justify-between">
              <p>Sunday</p>
              <p>8:00AM - 8:00PM</p>
            </div>
          </div>

          {/* follow us on */}
          <div className="flex flex-col items-center py-2 my-2 rounded border border-black">
            <p className="text-xl font-medium">Follow us on</p>
            <div className="flex w-2/3 justify-evenly text-xl pt-2">
              <i class="fa-brands fa-instagram cursor-pointer"></i>
              <i class="fa-brands fa-facebook cursor-pointer"></i>
              <i class="fa-brands fa-x-twitter cursor-pointer"></i>
            </div>
          </div>

          {/* speacial offer */}
          <div
            style={{ backgroundColor: "#FEFBEB" }}
            className="flex flex-col p-2 rounded border border-black my-2"
          >
            <p className="text-xl font-medium">Special Offer</p>
            <p className="text-sm">
              Join our loyalty program and get discount on your meals! Get
              membership now.
            </p>
            <button
              style={{ backgroundColor: "#FD8403ED" }}
              className="w-full text-white font-medium my-1 rounded py-1"
            >
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeDetails;