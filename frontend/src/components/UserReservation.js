import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import axios from 'axios';
import UserNavbar from './UserNavbar';
import backReseravtion from '../assets/HotelFrontView1.png';
import { Parallax } from 'react-parallax';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import CustomArrow from './CustomArrow';
import leftArrow from '../assets/left-arrow2.png';
import rightArrow from '../assets/right-arrow2.png';

export default function UserReservation() {
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [scrollAnimation, setScrollAnimation] = useState("reservation-scroll-hidden");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 3000);

    fetchData();

    return () => clearTimeout(timer); 
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/roomdetails');
      console.log('API Response:', response.data);
      const sortedRooms = response.data.existingPosts.sort((a, b) => a.roomno - b.roomno);
      setRooms(sortedRooms || []);
    } catch (error) {
      console.error('Error fetching room details:', error.message);
    } 
  };

  const handleCheckinChange = (date) => {
    setCheckinDate(date);
    if (date >= checkoutDate) {
      setCheckoutDate(null);
    }
  };

  const handleCheckoutChange = (date) => {
    setCheckoutDate(date);
  };

  const handleSearch = () => {
    setScrollAnimation("reservation-scroll");
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomArrow className="slick-prev" arrow={leftArrow} isNext={false} />,
    nextArrow: <CustomArrow className="slick-next" arrow={rightArrow} isNext={true} />,
    beforeChange: (current, next) => {
      
      setTimeout(() => setCheckinDate(checkinDate), 0);
    },
  };

  return (
    <div>
      <UserNavbar />
      {loading ? (
        
        <div className="loading-spinner">
          <DotLottieReact
            src="https://lottie.host/0e906da7-5c99-4ed6-9f7a-6c59cd26b7c0/w2HLxVPLQ4.json"
            loop
            autoplay
            speed={3}
          />
          <h1 className='about-header'>LotusWave</h1>
        </div>
      ) : (
        
        <>
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

          <div className='reservation-para'>
            <Slider {...sliderSettings}>
              {rooms.length > 0 ? (
                rooms.map((room, index) => (
                  <div key={index} className='reservation-room-component'>
                    <div className='reservation-room-item'>
                      <img src={`http://localhost:8000${room.roomimage}`}  alt={room.name} />
                    </div>
                    <div className='reservation-room-para'>
                      <h3>{room.roomname}</h3>
                      <h6>Room No {room.roomno}</h6>
                      <p>{room.roomdetails}</p>
                      <button className='dimention-btn'>View</button>
                      <button className='dimention-btn' style={{ marginLeft: '2%' }}>3D Model</button>
                      <p>LKR.{room.roomprice}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No rooms available</p>
              )}
            </Slider>
          </div>

          <DotLottieReact
            src="https://lottie.host/5b1f9230-f5b0-424e-974a-c16fd43e1832/WF2nJHJ5x8.json"
            className={scrollAnimation}
            loop
            autoplay
          />
        </>
      )}
    </div>
  );
}
