const express = require('express');
const mongoose=require('mongoose');
const bodyParser =require('body-parser');
const cors=require('cors');

const app=express();

//import routes

const userRoutes=require('./routes/user');
const roomdetailsRoutes=require('./routes/roomdetails');
const bookingRoutes=require('./routes/booking');
/*
const reviewRoutes=require('./routes/review');
const applyRoutes=require('./routes/eventapplication');
const eventRoutes=require('./routes/event');
const equipmentRoutes=require('./routes/equipments');
const reservationRoutes=require('./routes/reservations');
*/

//app middleware
app.use(bodyParser.json());
app.use(cors()); //this is using for avoiding the security reason block.reason is react run on localhost 3000 and backend part run on localhost 8000.so,block that site from the server

//route middleware

app.use(userRoutes);
app.use(roomdetailsRoutes);
app.use(bookingRoutes);
/*
app.use(reviewRoutes);
app.use(applyRoutes);
app.use(eventRoutes);
app.use(equipmentRoutes);
app.use(reservationRoutes);
*/

const PORT=8000;
const DB_URL='mongodb+srv://tenurapasandul2000:XRx8KaTmBsmNf3OP@attendsmart.xwknpfb.mongodb.net/?retryWrites=true&w=majority&appName=attendSmart';

mongoose.connect(DB_URL)
.then(()=>{
    console.log('DB connected');
})
.catch((err)=>console.log('DB connection error',err));


app.listen(PORT, ()=>{
    console.log(`App is running on ${PORT}`);
});