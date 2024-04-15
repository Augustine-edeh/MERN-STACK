require("dotenv").config();

// import cors
const cors = require("cors");

const express = require("express");
const workoutRoutes = require("./routes/workouts");

// express app
const app = express();

// use cors for the app
app.use(cors({ origin: "http://localhost:3000" }));

const mongoose = require("mongoose");

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & Listening on port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
