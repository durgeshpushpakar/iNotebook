const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let fetchuser = require("../middleware/fetchuser")
const JWT_SECRET = "durgeshisagoodbo$y";

// sign up route
// ROUTE:1 create a user using :post /api/auth/createuser request no login required
// signup route getting user datails using post request
router.post(
  "/createuser",
  body("email").isEmail(),
  body("name").isLength({ min: 3 }),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    // if there are errors then return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check whether the user with the same email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry this email is already registered!" });
      }
      // hashing the password using bcrypt
      const salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(req.body.password, salt);
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
      const authToken = jwt.sign(data, JWT_SECRET);
      // console.log(authToken);
      // console.log(user)
      res.json({ authToken });
    } catch (err) {
      console.log(err.message);
    }
  }
);

// ROUTE 2 Authenticate a user using :POST "/api/auth/login". No login required
// login POST route
router.post(
  "/login",
  body("email", "enter a valid email").isEmail(),
  body("password", "password cannot be blank").exists(),
  async (req, res) => {
    let success=false;
    // if there are errors then return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "try to login with correct credentials!" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false;
        return res.status(400).json({success, error: "try to login with correct credentials!" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success, authToken });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Internal server error!");
    }
  }
);

// ROUTE 3: Get logged in user details using :POST "/api/auth/getuser". No login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ error: "User not found in DB" });
    }
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal server error!");
  }
});
module.exports = router;
