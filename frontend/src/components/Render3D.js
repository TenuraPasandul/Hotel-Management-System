import React from 'react';
import Image360Viewer from './Image360Viewer';
import '../css/style.css';
import room from '../assets/room1.jpeg'
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '25px',
    width: '70%',
    height: '85vh',
  },
};

Modal.setAppElement('#root');

const Render3D = ({ isOpen, onRequestClose, room }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Room Details"
      >
    <div className="Render">
      <header className="Render-header">
       
        <Image360Viewer imageSrc={`http://localhost:8000${room.room3dview}`} />
        <button onClick={onRequestClose} className='room-booking-closebtn'><i className="bi bi-x-square"></i></button>
      </header>
    </div>
    </Modal>
    </>
  );
};

export default Render3D;
