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

// const createData = async (data) => {
//   try {
//     const players = await Player.insertMany(data);
//     console.log(players)
//   } catch (error) {
//     console.log("ERROR ADDING DATA TO DB", error)
//   }
// };

// createData(mockPlayers)

//CRUD OPERATIONS

//CREATE API
app.post("/api/post-player", async (req, res) => {
  try {
    const newPlayer = new Player(req.body);
    const savedPlayer = await newPlayer.save();

    res.status(201).json(savedPlayer);
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO POST THE PLAYER" });
  }
});

//READ API
app.get("/api/get-player", async (req, res) => {
  try {
    const players = await Player.find();

    res.status(200).json(players);
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO GET THE PLAYER" });
  }
});

//UPDATE API
app.put("/api/put-player/:playerID", async (req, res) => {
  try {
    const players = await Player.findByIdAndUpdate(
      req.params.playerID,
      req.body,
      { new: true }
    );

    res.status(200).json(players);
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO UPDATE THE PLAYER" });
  }
});

//DELETE API
app.delete("/api/delete-player/:playerID", async (req, res) => {
  try {
    const players = await Player.findByIdAndDelete(
      req.params.playerID,
      req.body,
      { new: true }
    );

    res.status(200).json(players);
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO DELETE THE PLAYER" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`APP IS RUNNING ON ${PORT} PORT`);
});
