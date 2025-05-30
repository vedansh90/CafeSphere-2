import mongoose from 'mongoose';
import 'dotenv/config';
import cafeModel from './models/cafeModel.js';
import connectDB from './config/mongodb.js';

// dotenv.config();

const cafes = [
  {
    name: "Brew & Bean",
    email: "brewbean@example.com",
    password: "hashedpassword1",
    ownerName: "Arjun Mehta",
    location: "MG Road",
    city: "Mumbai",
    contactNo: 9876543210,
    categories: ["Birthday", "CasualMeetup", "DateNight"],
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
  {
    name: "Café Cascade",
    email: "@exampcascadele.com",
    password: "hashedpassword2",
    ownerName: "Sneha Roy",
    location: "Park Street",
    city: "Kolkata",
    contactNo: 9123456780,
    categories: ["Anniversary", "RomanticDinner", "Surprise"],
    image: "https://images.unsplash.com/photo-1600891964653-388cc4e7cda1?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
  {
    name: "The Coffee House",
    email: "coffeehouse@example.com",
    password: "hashedpassword3",
    ownerName: "Rajiv Kumar",
    location: "Connaught Place",
    city: "Delhi",
    contactNo: 9988776655,
    categories: ["CorporateEvent", "Farewell", "Graduation"],
    image: "https://images.unsplash.com/photo-1604147706283-2fdde52b642d?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
  {
    name: "Caffeine Fix",
    email: "fixcafe@example.com",
    password: "hashedpassword4",
    ownerName: "Ananya Verma",
    location: "Hinjewadi",
    city: "Pune",
    contactNo: 9871234567,
    categories: ["KidsParty", "CasualMeetup"],
    image: "https://images.unsplash.com/photo-1585128792020-96641c29fe5b?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
  {
    name: "Bean Scene",
    email: "beanscene@example.com",
    password: "hashedpassword5",
    ownerName: "Rohan Malhotra",
    location: "Banjara Hills",
    city: "Hyderabad",
    contactNo: 9001122334,
    categories: ["Birthday", "Farewell", "Reunion"],
    image: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
  {
    name: "Daily Grind",
    email: "dailygrind@example.com",
    password: "hashedpassword6",
    ownerName: "Meera Shah",
    location: "Koregaon Park",
    city: "Pune",
    contactNo: 9112233445,
    categories: ["CorporateEvent", "DateNight", "Surprise"],
    image: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
  {
    name: "Bakers & Beans",
    email: "bakersbeans@example.com",
    password: "hashedpassword7",
    ownerName: "Nikhil Deshmukh",
    location: "Jubilee Hills",
    city: "Hyderabad",
    contactNo: 9234567810,
    categories: ["Graduation", "CasualMeetup"],
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
  {
    name: "Urban Sip",
    email: "urbansip@example.com",
    password: "hashedpassword8",
    ownerName: "Priya Narang",
    location: "Sector 29",
    city: "Gurgaon",
    contactNo: 9870897654,
    categories: ["Reunion", "RomanticDinner", "Anniversary"],
    image: "https://images.unsplash.com/photo-1506812574058-fc75fa93fead?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
  {
    name: "Mocha Mocha",
    email: "mochamocha@example.com",
    password: "hashedpassword9",
    ownerName: "Yash Joshi",
    location: "Church Street",
    city: "Bangalore",
    contactNo: 9900112233,
    categories: ["Surprise", "Birthday", "KidsParty"],
    image: "https://images.unsplash.com/photo-1528692926045-5b5c42ef27f5?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
  {
    name: "Java Junction",
    email: "javajunction@example.com",
    password: "hashedpassword10",
    ownerName: "Divya Iyer",
    location: "Thane West",
    city: "Mumbai",
    contactNo: 9012345678,
    categories: ["DateNight", "Farewell", "CorporateEvent"],
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
   {
    name: "Latte Lounge",
    email: "lattelounge@example.com",
    password: "hashedpassword11",
    ownerName: "Ayesha Khan",
    location: "Brigade Road",
    city: "Bangalore",
    contactNo: 9876001234,
    categories: ["PoetryNight", "Karaoke", "BoardGames"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
  {
    name: "The Roastery",
    email: "roastery@example.com",
    password: "hashedpassword12",
    ownerName: "Dev Sharma",
    location: "Sector 18",
    city: "Noida",
    contactNo: 9811234567,
    categories: ["ArtExhibition", "BookClub", "OpenMic"],
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
  {
    name: "Cafe Nirvana",
    email: "nirvana@example.com",
    password: "hashedpassword13",
    ownerName: "Isha Kapoor",
    location: "Marine Drive",
    city: "Mumbai",
    contactNo: 9000022233,
    categories: ["YogaMorning", "SufiNight", "VeganMeetup"],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
  {
    name: "Cocoa Craze",
    email: "cocoacraze@example.com",
    password: "hashedpassword14",
    ownerName: "Zaid Mirza",
    location: "Rajouri Garden",
    city: "Delhi",
    contactNo: 9321456701,
    categories: ["MusicJam", "StartupPitch", "CoffeeWorkshop"],
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
  {
    name: "Sips & Stories",
    email: "sipsstories@example.com",
    password: "hashedpassword15",
    ownerName: "Nikita Rane",
    location: "Camp Area",
    city: "Pune",
    contactNo: 9988111000,
    categories: ["Storytelling", "ComedyNight", "ArtTherapy"],
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
  {
    name: "The Hideout Cafe",
    email: "hideout@example.com",
    password: "hashedpassword16",
    ownerName: "Manan Patel",
    location: "Vastrapur",
    city: "Ahmedabad",
    contactNo: 9822765432,
    categories: ["GameNight", "MemeFest", "AnimeMeet"],
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
  {
    name: "Mood & Mugs",
    email: "moodmugs@example.com",
    password: "hashedpassword17",
    ownerName: "Pooja Desai",
    location: "Lal Bagh",
    city: "Indore",
    contactNo: 9090909090,
    categories: ["CraftWorkshop", "LiveAcoustic", "PaintSip"],
    image: "https://images.unsplash.com/photo-1544117519-31c1c3e0d310?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
  {
    name: "Toast & Tales",
    email: "toasttales@example.com",
    password: "hashedpassword18",
    ownerName: "Rehan Sheikh",
    location: "Ameerpet",
    city: "Hyderabad",
    contactNo: 9345678123,
    categories: ["PetFriendly", "TheatreNight", "PhotographyMeet"],
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
  {
    name: "The Steamy Cup",
    email: "steamycup@example.com",
    password: "hashedpassword19",
    ownerName: "Ritu Bajaj",
    location: "Hazratganj",
    city: "Lucknow",
    contactNo: 9123409876,
    categories: ["HeritageTalk", "FoodTasting", "CookOff"],
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  },
  {
    name: "Perk & Perch",
    email: "perkperch@example.com",
    password: "hashedpassword20",
    ownerName: "Sahil Batra",
    location: "Bistupur",
    city: "Jamshedpur",
    contactNo: 8877665544,
    categories: ["CodingHangout", "StudySession", "FreelancerHub"],
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=60",
    bookings: [],
    menu: [],
    drink: [],
  }
];



const seedCafes = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URL); 
    connectDB();
    await cafeModel.deleteMany(); 
    await cafeModel.insertMany(cafes);
    console.log('Sample cafes inserted!');
    process.exit();
  } catch (error) {
    console.error('Error inserting cafes:', error);
    process.exit(1);
  }
};

seedCafes();