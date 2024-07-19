import React from 'react';
import { Parallax } from 'react-parallax';
import UserNavbar from './UserNavbar';
import '../css/style.css';
import backgroundImage from '../assets/bg-header1.jpeg';
import image1 from '../assets/HotelLobby.jpg'
import image2 from '../assets/HotelFrontView.png';
import image3 from '../assets/HotelUpstair.jpg';
import image4 from '../assets/HotelWashroom.jpg';
import image5 from '../assets/HotelActivity.jpg';

export default function Home() {
  return (
    <div className='home'>
      <Parallax bgImage={backgroundImage} strength={500}>
        <div className='home-canvas'>
          <UserNavbar />
          <div className='home-para'>
            <h1>Welcome to the LotusWave Hotel</h1>
            <p>Your Dream Paradise in Sri Lanka</p>
          </div>
        </div>
      </Parallax>
      <div className='home-para1'>
        <h2>LotusWave Hotel</h2>
        <p>
        Welcome to LotusWave Hotel, a five-star haven of luxury and comfort, where elegance meets exceptional service. Nestled in a prime location, LotusWave Hotel offers an unparalleled experience with its state-of-the-art amenities, sophisticated decor, and breathtaking views. Each room and suite is designed with meticulous attention to detail, ensuring a perfect blend of modernity and tranquility. Indulge in our world-class dining options, unwind at our serene spa, and enjoy the convenience of our cutting-edge business facilities. At LotusWave Hotel, every guest is treated with the utmost care, creating memorable stays for both business and leisure travelers. Discover the epitome of opulence and hospitality at LotusWave Hotel, where your satisfaction is our top priority.
        </p>

        <div className='home-gallery'>
            <img src={image1} className='gallery-left row1'/>
            <img src={image2} className='gallery-middle row1'/>
            <img src={image3} className='gallery-right row1'/>
            <img src={image4} className='gallery-left row2'/>
            <img src={image5} className='gallery-right row2'/>
        </div>
        <button className='home-gallery-btn'>View Gallery</button>
      </div>
    </div>
  );
}
