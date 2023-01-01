require('dotenv').config()
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = process.env.JWT_SECRET;
const _envClient = parseInt(process.env.clientError);
const _envServerError = parseInt(process.env.serverError);

//Route1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("confirmPassword", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = true;
    if (req.body.password !== req.body.confirmPassword) {
      success = false;
      return res.status(_envClient).json({ success, error: "Passwords don't match" });
    }
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(_envClient).json({ success, errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res.status(parseInt(_envClient)).json({
          success,
          error: "Sorry a user with this email already exists",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // res.json(user)
      res.json({ success, authtoken });
    } catch (error) {
      success = false;
      console.error(error);
      res.status(_envServerError).send(success, "Internal Server Error");
    }
  }
);

//Route2: Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    let success = true;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(_envClient).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(_envClient).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(_envClient).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(_envServerError).send("Internal Server Error");
    }
  }
);

// Route3: Get Loggedin user details using: POST "/api/auth/getuser".Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(_envServerError).send("Internal Server Error");
  }
});
module.exports = router;

// Route3: Reset pasword using: PUT "/api/auth/resetPassword".No Login Required
router.put("/resetpassword", async (req, res) => {
  const { email } = req.body;
  let success = true;
  let user = await User.findOne({ email });
  try {
    if (!user) {
      success = false;
      return res.status(_envClient).json({
        success,
        error: "User does not exist!",
      });
    }
    res.json({ success, message: "Email Verified" });
  } catch (error) {
    console.error(error.message);
    res.status(_envServerError).send("Internal Server Error");
  }
});


router.put("/resetpassword/newcredentials", async (req, res) => {
  const { email } = req.body;
  let success = true;
  let user = await User.findOne({ email });
  try {
    const { newPassword, cPassword } = req.body;
    if (newPassword !== cPassword) {
      return res.status(_envClient).json({ success, error: "Passwords don't match" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.newPassword, salt);
    await User.updateOne({ id: user._id }, { $set: { password: secPass } });
    res.json({ success, message: "Password Reset Successfully" });

  } catch (error) {
    console.error(error.message);
    res.status(_envServerError).send("Internal Server Error");
  }
});