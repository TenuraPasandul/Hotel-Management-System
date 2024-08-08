const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomno: {
    type: Number,
    required: true
  },
  roomname: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  adults: {
    type: Number,
    required: true
  },
  child: {
    type: Number,
    required: true
  },
  roomservices: {
    type: String,
    required: true
  },
  roomdetails: {
    type: String,
    required: true
  },
  roomprice: {
    type: Number,
    required: true
  },
  roomimage: {
    type: String, 
    required: false
  },
  room3dview: {
    type: String, 
    required: false
  }
});

module.exports = mongoose.model('rooms', roomSchema);
