import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useSnackbar } from 'notistack';
import Accordion from 'react-bootstrap/Accordion';

export default function AdminAddRoom() {
  const [roomNo, setRoomNo] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomDetails, setRoomDetails] = useState('');
  const [roomPrice, setRoomPrice] = useState('');
  const [roomImage, setRoomImage] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState('0');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/roomdetails');
      const sortedRooms = (response.data.existingPosts || []).sort((a, b) => a.roomno - b.roomno);
      setRooms(sortedRooms);
    } catch (error) {
      console.error('Error fetching room details:', error.message);
      enqueueSnackbar('Error fetching room details.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    setRoomImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (roomPrice <= 0) {
      enqueueSnackbar('Room price must be a positive number.', { variant: 'warning' });
      return;
    }
    const formData = new FormData();
    formData.append('roomno', roomNo);
    formData.append('roomname', roomName);
    formData.append('roomdetails', roomDetails);
    formData.append('roomprice', roomPrice);
    if (roomImage) {
      formData.append('roomImage', roomImage);
    }

    try {
      const response = await axios.post('http://localhost:8000/roomdetails/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchRooms();
      setRoomNo('');
      setRoomName('');
      setRoomDetails('');
      setRoomPrice('');
      setRoomImage(null);
      enqueueSnackbar('Room added successfully!', { variant: 'success' });
    } catch (error) {
      console.error('Error adding room:', error.message);
      enqueueSnackbar('Failed to add room.', { variant: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/roomdetails/delete/${id}`);
      fetchRooms();
      enqueueSnackbar('Room deleted successfully!', { variant: 'success' });
    } catch (error) {
      console.error('Error deleting room:', error.message);
      enqueueSnackbar('Failed to delete room.', { variant: 'error' });
    }
  };

  const handleAccordionSelect = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-4">Add New Room</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="roomNo">Room Number</label>
              <input
                type="text"
                className="form-control"
                id="roomNo"
                value={roomNo}
                onChange={(e) => setRoomNo(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="roomName">Room Name</label>
              <input
                type="text"
                className="form-control"
                id="roomName"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="roomDetails">Room Details</label>
              <textarea
                className="form-control"
                id="roomDetails"
                rows="3"
                value={roomDetails}
                onChange={(e) => setRoomDetails(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="roomPrice">Room Price (LKR)</label>
              <input
                type="number"
                className="form-control"
                id="roomPrice"
                value={roomPrice}
                onChange={(e) => setRoomPrice(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="roomImage">Room Image</label>
              <input
                type="file"
                className="form-control"
                id="roomImage"
                onChange={handleImageChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Room
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h2 className="mb-4">Existing Rooms</h2>
          {loading ? (
            <p>Loading rooms...</p>
          ) : (
            <div className="list-group">
              <Accordion activeKey={activeKey} onSelect={handleAccordionSelect} alwaysOpen>
                {rooms.map((room, index) => (
                  <Accordion.Item key={room._id} eventKey={index.toString()} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Accordion.Header>{room.roomname} - Room No {room.roomno}</Accordion.Header>
                        <Accordion.Body>
                          <p>{room.roomdetails}</p>
                          <p>Price: LKR {room.roomprice}</p>
                          {room.roomimage && (
                            <img src={`http://localhost:8000${room.roomimage}`} alt={room.roomname} style={{ width: '100px', height: '100px' }} />
                          )}
                        </Accordion.Body>
                      </div>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(room._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
