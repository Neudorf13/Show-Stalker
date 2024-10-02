const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const corsOptions = {
  origin: "http://localhost:5173",
};

const userRoutes = require("./routes/userRoutes");
const showRoutes = require("./routes/showRoutes");

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/shows", showRoutes);

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
