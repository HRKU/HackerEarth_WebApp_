var express = require('express');
var router = express.Router();
const { check } = require("express-validator");
const { signup, signin} = require("../controllers/auth")

router.post("/signup",
    [
        check("Fullname","Fullname should be at least 3 chars").isLength({ min:3}),
        check("Email","Email is required").isEmail(),
        check("Password","Password should be at least 4 chars").isLength({ min: 4}) 
    ],
    signup

)

router.post(
    "/signin",
    [
      check("Email", "Email is required").isEmail(),
      check("Password", "Password field is required").isLength({ min: 1 })
    ],
    signin
  );
  
  //router.get("/signout", signout);
  
  module.exports = router;



const {getalluser,
      getuser,getuserById,
      removeuser,updateuser
      } = require("../controllers/auth");

router.param("userId", getuserById);

router.put("/user/:userId",updateuser);

router.get("/users",getalluser);
router.get("/user/:userId", getuser);
router.delete("/user/:userId",removeuser);



module.exports = router;