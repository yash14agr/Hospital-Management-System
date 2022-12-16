const mongoose = require('mongoose')

const Schema1 = mongoose.Schema

const DoctorSchema = new Schema1({
    name: String,
    number: String,
    city: String,
    symtoms:String,
    department:String,
    earning:{
        type: Number,
        default:0
    }
  });
  
const doctor=mongoose.model('doctor',DoctorSchema);
module.exports =doctor