const mongoose=require('mongoose');

const roomSchema=new mongoose.Schema({
    
    roomno:{
        type:Number,
        required:true
    },
    roomname:{
        type:String,
        required:true
    },
    roomdetails:{
        type:String,
        required:true
    },
    roomprice:{
        type:Number,
        required:true
    }
    
});

module.exports=mongoose.model('rooms',roomSchema);