const express = require("express");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../model/user");

router.post("/user/register",  (req,res)=>{
    
    const user = new User({... req.body});
      jwt.sign({ user: user }, "secret key", async (err, token) => {
          user.token = token;
          await user.save();
          try {
              if (user) {
                  res.json(user);
              }
          } catch (err) {
              console.log(err);
          }
      });

})

module.exports = router;
