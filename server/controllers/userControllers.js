const db = require("../db");
const bcrypt = require("bcrypt");
const {getUserRefreshToken} = require("../services/userService");

const getUserShows = (userID) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT s.showID, s.showName, s.showRating, s.showImage, us.subscribed
      FROM shows s
      INNER JOIN userShows us ON s.showID = us.showID
      WHERE us.userID = ?
    `;

    db.all(query, [userID], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows); // `rows` will contain the list of shows
    });
  });
};

//   /login route
const loginUser = (req, res) => {
  const { username, password } = req.body;

  console.log(req.body);
  console.log("username: " + username + " password: " + password);

  const query = "SELECT * FROM users WHERE username = ?";

  db.get(query, [username], async (err, row) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    if (!row) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password." });
    }

    const userID = row.userID;
    console.log("userID: " + userID);

    const isMatch = await bcrypt.compare(password, row.passwordHash);

    if (isMatch) {
      try {
        // Retrieve user's saved shows
        console.log("is match...");

        const savedShows = await getUserShows(userID);
        console.log("User's saved shows: ", savedShows);

        const refreshToken = await getUserRefreshToken(userID);
        console.log(refreshToken);
        let calendarSubscribed = false;
        if(refreshToken) {
          calendarSubscribed = true;
        }

        // Return success response with userID and list of shows
        return res.json({
          success: true,
          message: "Login successful!",
          userID: userID,
          savedShows: savedShows,
          calendarSubscribed: calendarSubscribed
        });
      } catch (err) {
        console.error("Error fetching user's saved shows:", err);
        return res
          .status(500)
          .json({ success: false, message: "Error fetching saved shows." });
      }
      //look up all shows associated with this userID
      //preferably done as a seperate function that returns json with a success message either true or false, and a list of shows associated with the userID

      //return res.json({ success: true, message: "Login successful!" });
    } else {
      // Passwords do not match
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password." });
    }
  });
};
//   /register route
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
    return res.json({
      success: false,
      message: "Username must contain at least 6 characters.",
    });
  } else if (password.length < 8) {
    console.log("password too short");
    return res.json({
      success: false,
      message: "Password must contain at least 8 characters.",
    });
  } else if (!validateEmail(email)) {
    console.log("Invalid email format.");
    return res.json({ success: false, message: "Invalid email format." });
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
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Error hashing password" });
      }

      const insertQuery =
        "INSERT INTO users (username, email, passwordHash) VALUES (?, ?, ?)";
      db.run(insertQuery, [username, email, hash], function (err) {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ success: false, message: "Error inserting user" });
        }

        // Successfully inserted new user
        return res.json({ success: true, message: "Register successful!" });
      });
    });
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
