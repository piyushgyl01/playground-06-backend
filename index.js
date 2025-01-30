const express = require("express");
const app = express();

const { initialiseDatabase } = require("./db/db.connect.js");

initialiseDatabase();

const Player = require("./models/player.model.js");

app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json("Footbal Management App By Piyush Goyal");
});

const createData = async (data) => {
  try {
    const players = await Player.insertMany(data);
    console.log(players)
  } catch (error) {
    console.log("ERROR ADDING DATA TO DB")
  }
};

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`APP IS RUNNING ON ${PORT} PORT`);
});
