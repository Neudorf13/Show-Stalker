const express = require("express");
const app = express();
const session = require('express-session');
const cors = require("cors");
const axios = require("axios");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(
  session({
    secret: 'tempKey', // DEVELOPMENT
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // set to true in production //DEVELOPMENT
      maxAge: 3600000, // 1 hour
    },
  })
);

const userRoutes = require("./routes/userRoutes");
const showRoutes = require("./routes/showRoutes");
const calendarRoutes = require("./routes/calendarRoutes");
const userShowRoutes = require("./routes/userShowRoutes");

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/userShows", userShowRoutes);

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
