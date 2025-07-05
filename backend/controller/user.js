const User = require("../model/User");
const bcrypt = require("bcrypt");
const path = require("path");
var jwt = require("jsonwebtoken");


const signup = async (req, res, next) => {
  
    try {
      
    
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
          return res.status(400).json({ error: 'Email already in use' });
      }

      let hashed = await bcrypt.hash(req.body.password, 10);

      let user = await User.create({ ...req.body, password: hashed });

      res.send(user);
  } catch (err) {
      next(err);
  }
    
  };

 
  

  const login = async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email }); // null
      if (user) {
        let matched = await bcrypt.compare(req.body.password, user.password);
  
        if (matched) {
    
          
          user = user.toObject();

          const token = jwt.sign(user, process.env.JWT_SECRET,{expiresIn:"7d"});
          return res.send({ token, user })
        }
      }
  
      // If credentials don't match
      res.status(401).send({
        msg: "Incorrect email or password",
      });
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).send({
        msg: "An error occurred while processing your request",
      });
    }
  };


  const getLoggedUser = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  
  
  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select("-password"); // Exclude passwords from the result
  
      res.send(users);
    } catch (err) {
      console.log(err);
    }
  };
  module.exports = {
    signup,
    login,
    getLoggedUser,
    getAllUsers,
  };