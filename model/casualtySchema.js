const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CasualtySchema = new Schema({
    name:String,
    number: String,
    city: String,
    age:String,
    symtoms:String,
    fee:Number,
    active:{type: Boolean,default:true},
    // active1:Boolean,
    admitted:{type:Boolean,default:true},
    death:{type:Boolean,default:false}
  });
  
//   const User = mongoose.model("User", UserSchema);

const casualtySchema=mongoose.model('Casualty',CasualtySchema);
module.exports =casualtySchema 