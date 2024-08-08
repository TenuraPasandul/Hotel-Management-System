// CheckoutModal.js
import React from 'react';
import Modal from 'react-modal';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import '../css/style.css';

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

export default function CheckoutModal({ isOpen, onRequestClose, room, setSuccess }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Payment Checkout"
    >
    <button onClick={onRequestClose} className='room-booking-closebtn'><i className="bi bi-x-square"></i></button>
      <h2>Event Ticket Payment</h2>
      <p>Ticket Price: LKR {room.roomprice}</p>
      <PayPalScriptProvider options={{ "client-id": "AbePtiDNqzuFs66DYkA2EXTKWhEgLbeRjSA4MUrkTjpA1b0Kf3NlrXgvZm9uyDGyYWMNoRf-SA4FPcPM" }}>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: room.roomprice.toString(),
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              setSuccess(true);
              onRequestClose();
              alert("Transaction completed by " + details.payer.name.given_name);
            });
          }}
        />
      </PayPalScriptProvider>
    </Modal>
  );
}
