 import React from "react";
import "./style.css";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
  import page from '../assets/Page-4-bgimg.png';
  import page1 from '../assets/Page-3-bg-img.jpg';
  import page2 from '../assets//5 (2).png';
 



const About = () => {
  return (
    <div className="landing-page">
      <div className="part1">
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        <section className="hero">
          <div className="container">
            <div className="hero-text">
              <h1>
                Gather, Toast, Enjoy:<br />
                Cafe Spaces for Every Occasion
              </h1>
              <p>
                Discover and reserve cafes near you for special occasions like birthdays, anniversaries, office parties, and more. Whether you're a cafe owner looking to showcase your venue or a user searching for the ideal spot to celebrate, our platform makes booking simple, convenient, and tailored to your needs. Start planning your next event with just a few clicks!
              </p>
            
            </div>
          </div>
        </section>
      </div>

      <div className="part2">
        <div className="container">
          <div className="header">
            <h1>Discover Your Perfect Space for Unforgettable Events</h1>
          </div>
          <div className="content">
            <div className="image-box">
              <img src="https://img.freepik.com/free-photo/portrait-man-practicing-his-profession-celebrate-international-labour-day_23-2151230086.jpg" alt="Cafe Barista" />
              <div className="caption">
                <h2>Showcase Your Café and Attract Event Planners</h2>
                <p>
                  Expand your customer base by listing your café on our platform. Reach event planners, party organizers, and people looking for the perfect space to celebrate birthdays, anniversaries, and office gatherings.
                </p>
              </div>
            </div>
            <div className="image-box">
              <img src="https://img.freepik.com/free-photo/women-celebrating-with-champagne-confetti_23-2147651781.jpg" alt="Celebration Event" />
              <div className="caption">
                <h2>Find and Book the Perfect Café for Any Occasion</h2>
                <p>
                  Looking for the perfect spot to host your next event? Whether it's an intimate birthday celebration, a romantic anniversary dinner, or an office party, we make finding and booking the ideal café easy. Secure your reservation in minutes and make your special occasion truly unforgettable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="background-container"  style={{
    backgroundImage: `url(${page1})`,
     
     
      
     
  }}>
        <div className="overlay">
          <h1 className="title">How Does It Work</h1>
          <div className="steps-container">
            <div className="step">
              <h4>Explore Cafés</h4>
              <p>
                Browse through a curated selection of cafés based on location, event type, capacity, and budget. View detailed descriptions, photos, and user reviews to find the perfect spot for your celebration.
              </p>
            </div>
            <div className="step">
              <h4>Compare and Select</h4>
              <p>
                Once you find cafés that match your needs, compare prices, available dates, and features to make the best choice for your event. Save your favorites or proceed to book instantly.
              </p>
            </div>
            <div className="step">
              <h4>Book with Ease</h4>
              <p>
                Finalize your booking in just a few clicks. Secure your chosen café by confirming the date and time, and easily handle payments through our platform. You're all set for your event!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-container" id="about-container">
        <div className="about-text">
          <h1>About Us</h1>
          <p>
            At CafeSphere, we believe that every special moment deserves the perfect setting. Whether you're celebrating a birthday, anniversary, office party, or any other occasion, our platform makes it easier than ever to find and book the ideal café.
          </p>
          <p>
            Founded with a passion for bringing people and spaces together, our mission is to simplify the event-planning process.
          </p>
          <p>We're committed to:</p>
          <ul>
            <li>Ease of Use: Browse, compare, and book venues in just a few clicks.</li>
            <li>Diverse Selection: From cozy cafés to trendy spots, we have something for every occasion.</li>
            <li>Trust and Transparency: We provide verified reviews, clear pricing, and real-time availability.</li>
          </ul>
        </div>
      
      <div className="about-image">
  <img src={page} alt="CafeSphere platform on laptop" />
</div>

      
      </div>

      <div className="cafe">
        <img src={page2} alt="CafeSphere Logo" />
      </div>

      <section className="image-section">
        <img src="https://img.freepik.com/free-photo/cup-coffee-with-heart-drawn-foam_1286-70.jpg" alt="Coffee with cookie" />
        <img src="https://img.freepik.com/free-photo/close-up-barista-making-cappuccino-bartender-preparing-coffee-drink_1150-14699.jpg" alt="Barista making coffee" />
        <img src="https://img.freepik.com/free-photo/young-woman-eating-croissants-cafe_1303-20408.jpg" alt="Customer enjoying coffee" />
      </section>
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
    </div>
  );
};

export default About;