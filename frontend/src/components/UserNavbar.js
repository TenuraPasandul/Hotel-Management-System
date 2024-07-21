import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import "../css/style.css";
import logo from '../assets/lotus logo.png';
import logo1 from '../assets/lotus logo1.png';

export default function UserNavbar() {
  const navigate = useNavigate();
  const [navBackground, setNavBackground] = useState('transparent');
  const [navFont, setNavFont] = useState('white');
  const [logoHead, setLogoHead] = useState(logo);
  const [logoStyle, setLogoStyle] = useState("home-logo");
  const [isOpen, setIsOpen] = useState(false);
  const [selectStyle, setSelectStyle] = useState("selectbox");
  const [reserveStyle,setReserveStyle] = useState("reserve-btn");

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavBackground('white');
      setNavFont('black');
      setLogoHead(logo1);
      setLogoStyle("home-logo1");
      setSelectStyle("selectbox1");
      setReserveStyle("reserve-btn1");
    } else {
      setNavBackground('transparent');
      setNavFont('white');
      setLogoHead(logo);
      setLogoStyle("home-logo");
      setSelectStyle("selectbox");
      setReserveStyle("reserve-btn");
    }
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className='navbar fixed-top' style={{ backgroundColor: navBackground, color: navFont }}>
        <span >
          <i className="bi bi-list fs-2 px-4 py-2" onClick={toggleDrawer}></i>
          <i className="bi bi-search fs-4 px-4 py-2" ></i>
        </span>
        <img src={logoHead} className={logoStyle} />
        <ul className='nav-items'>
          <li>
            <select className={selectStyle}>
                <option>English</option>
                <option>Sinhala</option>
            </select>
          </li>
          <li><i className="bi bi-person px-1"></i>Login</li>
          <li>My Reservation</li>
          <li><button className={reserveStyle} onClick={()=>navigate('/reservation')}>RESERVE</button></li>
        </ul>
      </div>
      <div className={`side-drawer ${isOpen ? 'open' : ''}`}>
        <br/>
      <i className="bi bi-x fs-2 px-4 py-2" onClick={toggleDrawer}></i>
        <ul>
          <li onClick={toggleDrawer}>Gallery</li>
          <li onClick={toggleDrawer}>Contact Us</li>
          <li onClick={toggleDrawer}>About Us</li>
        </ul>
      </div>
    </>
  );
}
