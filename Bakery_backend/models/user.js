const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  
    Fullname: // Fullname type
    {
        type: String,
        required: true
    },

    Email: // Email parameter
    {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000,
        unique: true
    },

    Dateofbirth: //Date of birth parameter
    {
        type: Date,
        required: true

    },

    Mobile:  // Mobile Parameter
    {
        type: Number,
        required: true,
        maxlength: 10,
        unique: true
    },

    Password:  // Password Parameter
    {
        type: String,
        required: true,
        maxlength: 12,
        trim: true
    },

    Address: // Address parameter
    {
        type: String,
        trim: true
    },

    City: // City Parameter
    {
        type: String,
        required: true
    },
 
   

},
{timestamps:true})
UserSchema.methods = 
{
  autheticate: function(plainpassword) {
    return plainpassword === this.Password;
  },

  
};


module.exports = mongoose.model("User",UserSchema);