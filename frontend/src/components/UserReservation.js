import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import UserNavbar from './UserNavbar';
import backReseravtion from '../assets/HotelFrontView1.png';
import image1 from '../assets/HotelLobby.jpg';
import scroll from '../assets/scroll.mp4';
import { Parallax } from 'react-parallax';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/style.css';

export default function UserReservation() {
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [scrollAnimation,setScrollAnimation] = useState("reservation-scroll-hidden");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleCheckinChange = (date) => {
    setCheckinDate(date);
    if (date >= checkoutDate) {
      setCheckoutDate(null);
    }
  };

  const handleCheckoutChange = (date) => {
    setCheckoutDate(date);
  };

  const handleSearch = () =>{
    setScrollAnimation("reservation-scroll")
  }

  return (
    <div>
      <UserNavbar />
      <Parallax bgImage={backReseravtion} strength={500}>
        <div className='home-canvas'>
          <div className='reservation-form'>
            <div>
              <label>Check-in Date:</label>
              <DatePicker
                selected={checkinDate}
                onChange={handleCheckinChange}
                selectsStart
                startDate={checkinDate}
                endDate={checkoutDate}
                minDate={new Date()}
                placeholderText="Select a check-in date"
              />
            </div>
            <div>
              <label>Check-out Date:</label>
              <DatePicker
                selected={checkoutDate}
                onChange={handleCheckoutChange}
                selectsEnd
                startDate={checkinDate}
                endDate={checkoutDate}
                minDate={checkinDate}
                placeholderText="Select a check-out date"
              />
            </div>
            <div className='reservation-guest'>
              <label>Adults:</label>
              <input
                type="number"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                min="1"
              />
            </div>
            <div className='reservation-guest'>
              <label>Children:</label>
              <input
                type="number"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                min="0"
              />
            </div>
            <button className='reservation-search-btn' onClick={handleSearch}>Search</button>
          </div>
        </div>
      </Parallax>
      <DotLottieReact
      src="https://lottie.host/5b1f9230-f5b0-424e-974a-c16fd43e1832/WF2nJHJ5x8.json"
      className={scrollAnimation}
      loop
      autoplay
    />
      <div className='reservation-para'>
      
        <div className='reservation-room'>
        <div className='reservation-room-item'><img src={image1}/></div>
          <div className='reservation-room-para'>
            <h3>fddf</h3>
            <p>dscdssdc</p>
            <p>LKR.2500</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
