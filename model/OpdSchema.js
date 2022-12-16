const mongoose = require('mongoose')

const Schema = mongoose.Schema

const OpdSchema = new Schema({
    name:String,
    number: String,
    city: String,
    age:String,
    symtoms:String,
    fee:{type:Number,default:100},
    active:{type: Boolean,default:true},
    // active1:Boolean,
    admitted:{type:Boolean,default:false},
    death:{type:Boolean,default:false}
  });
  
//   const User = mongoose.model("User", UserSchema);

const opdSchema=mongoose.model('OPD',OpdSchema);
module.exports =opdSchema 