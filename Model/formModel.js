const mongoose= require('mongoose')


const formSchema=new mongoose.Schema({
    userName:{type:String},
    email:{type:String},
    phNo:{type:String},
    name:{type:String},
    dob:{type:String},
})

const formmodel=mongoose.model('formmodel',formSchema);

module.exports ={formmodel}