const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const prodcutSchema = new mongoose.Schema({
    ProductName:
    {
        type:String,
        trim:true,
        required:true,
        unique:false
    },
    Description:
    {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    Cost: 
    {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    category:
    {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    Stock:
    {
        type: Number
    },
    Sold:
    {
        type: Number,
        defualt: 0
    },
    photoByPath:
    {
        type: String
    },
    rating: {
        type: Number,
    }
},
{timestamps:true})


module.exports = mongoose.model("Product",prodcutSchema);


