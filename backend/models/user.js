const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    approval:{
        type:Boolean,
        required:true
    },
    role:{
        type:String,
        required:true 
    }
});

module.exports=mongoose.model('users',userSchema);