const mongoose = require("mongoose");

require("dotenv").config();
const MONGOURI = process.env.MONGODB;

const initialiseDatabase = async () => {
  await mongoose
    .connect(MONGOURI)
    .then(() => {
      console.log("CONNECTED TO DATABASE");
    })
    .catch((error) =>
      console.log("ERROR OCCURED WHILE CONNECTING TO DATABASE", error)
    );
};

module.exports = { initialiseDatabase };
