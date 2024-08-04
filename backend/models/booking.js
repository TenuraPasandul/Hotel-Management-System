const mongoose=require('mongoose');

const bookingSchema=new mongoose.Schema({
    roomnoid:{
        type:Number,
        required:true
    },
    userid:{
        type:Number,
        required:true
    },
    usertype:{
        type:String,
        required:true
    },
    startdate:{
        type:Date,
        required:true
    },
    enddate:{
        type:Date,
        required:true
    }
    
    
});

module.exports=mongoose.model('bookings',bookingSchema);