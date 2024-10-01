const db = require("../db");

const loginUser = (req, res) => {
    const { username, password } = req.body;
  
    console.log("Username: ${username}, Password ${password}");
  
    if (username === "user" && password === "pass") {
      console.log("user+pass match");
      res.json({ success: true, message: "Login successful!" });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  };


const registerUser = (req, res) => {
    //const {username, password, email} = req.body.user;
    const { user } = req.body;
    const username = user.username;
    const password = user.password;
    const email = user.email;
  
    console.log("Received body:", req.body);
    console.log(
      "Username: " + username + ", Password: " + password + ", Email: " + email
    );
  
    //need to repeat the soft checks, ie. username/password have enough characters, proper email, ect
    //next need to check if username/email is already taken
    if (username.length < 6) {
      console.log("username length too short");
      res.json({
        success: false,
        message: "Username must contain at least 6 characters.",
      });
    } else if (password.length < 8) {
      console.log("password too short");
      res.json({
        success: false,
        message: "Password must contain at least 8 characters.",
      });
    } else if (!validateEmail(email)) {
      console.log("Invalid email format.");
      res.json({ success: false, message: "Invalid email format." });
    }
    console.log("first test");
  
    const query = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.get(query, [username, email], (err, row) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
  
      if (row) {
        console.log("test");
        if (row.username === username) {
          return res.json({
            success: false,
            message: "Username is already taken.",
          });
        } else if (row.email === email) {
          return res.json({
            success: false,
            message: "Email is already registered.",
          });
        }
      }
      return res.json({ success: true, message: "Register successful!" });
    });
  };
  
  // Simple email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  module.exports = {
    loginUser,
    registerUser,
  };