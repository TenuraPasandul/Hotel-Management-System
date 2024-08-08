// RoomModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import CheckoutModal from './CheckoutModal';
import '../css/style.css';
import Render3D from './Render3D';

const customStyles = {
  content: {
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '25px',
    width: '60%',
    height: '80vh',
  },
};

Modal.setAppElement('#root');

export default function RoomModal({ isOpen, onRequestClose, room }) {
  const [characters, setCharacters] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCheckoutOpen3D, setIsCheckoutOpen3D] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (room.roomservices) {
      setCharacters(room.roomservices.split(''));
    }
  }, [room.roomservices]);

  let word = "";
  let fullword = "";
  const serviceFunc = (service) => {
    if (service === '.') {
      fullword = word;
      word = "";
      return <li>{fullword}.</li>;
    } else {
      word = word + service;
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Room Details"
      >
        <h2 className='room-booking-heading'>{room.roomname}</h2>
        <h5>Room No {room.roomno}</h5>
        <i className="bi bi-aspect-ratio fs-3"></i><label className='px-4'>{room.size} sq m</label>
        <i className="bi bi-people fs-3 px-3"></i><label>{room.adults} Adults & {room.child} Childs</label>

        <p>{room.roomdetails}</p>
        <p>Price: LKR {room.roomprice}</p>
        <hr />
        <h6>SERVICES & AMENITIES</h6>
        <ul className='custom-list col-md-6'>
          {characters.map((char, index) => (
            <>
              {serviceFunc(char)}
            </>
          ))}
        </ul>
        <div className="button-group">
          <button className='room-booking-btn' onClick={() => setIsCheckoutOpen(true)}>Book Now</button>
          <button className='room-booking-btn' onClick={() => setIsCheckoutOpen3D(true)}>3D View</button>
          <button onClick={onRequestClose} className='room-booking-closebtn'><i className="bi bi-x-square"></i></button>
        </div>
      </Modal>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onRequestClose={() => setIsCheckoutOpen(false)}
        room={room}
        setSuccess={setPaymentSuccess}
      />

      <Render3D
        isOpen={isCheckoutOpen3D}
        onRequestClose={() => setIsCheckoutOpen3D(false)}
        room={room}
        
      />
    </>
  );
}
