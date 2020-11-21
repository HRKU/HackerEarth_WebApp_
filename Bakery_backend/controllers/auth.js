const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Failed to Create an Account"
      });
    }
    res.json({
      name: user.Fullname,
      email: user.Email,
      id: user._id,
      Message: "Signed Up Successfully."
    });
  });
};

exports.signin = (req, res) => {
 
  const { Email, Password } = req.body;

  User.findOne({ Email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "There is no account linked with the email entered."
      });
    }

    if (!user.autheticate(Password)) {
      return res.status(401).json({
        error: "Email or password do not match."
      });
    }

    


    const { _id, Fullname, Email } = user;
    return res.json({ 
              user: { _id, Fullname,Email } , 
              Message: "Signed In Successfully."
            });
  });
};

    exports.getalluser =(req, res) => {
        User.find().exec((err, users) => {
        if (err) {
            return res.status(400).json({
            error: "NO users found"
            });
        }
        res.json(users);
        });
    };
    exports.getuser = (req, res) => {
      return res.json( {user: { _id, name, email }});
    };
    exports.getuserById = (req, res, next, id) => {
        User.findById(id).exec((err, cate) => {
          if (err) {
            return res.status(400).json({
              error: "User not found in DataBase"
            });
          }
          req.user = cate;
          next();
        });
      };  


    exports.removeuser = (req, res) => {
        const user = req.user;

        user.deleteOne((err, user) => {
        if(err) {
            return res.status(400).json({
            error: "Failed to remove user. Does not exists."
            });
        }
        res.json({
            message: "Successfully Deleted."
        });
        });
    };  
    exports.updateuser = (req, res) => {
    
      const user = req.user;
     
      user.Fullname = req.body.Fullname;
      user.Email = req.body.Email;
      user.Address = req.body.Address;  
    
      user.save((err, updateduser) => {
        if (err) {
          return res.status(400).json({
            error: "Failed to update user"
          });
        }
        res.json(updateduser);
      });
    };

