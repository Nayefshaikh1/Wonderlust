// seedAtlas.js
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wonderlist";

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // other options if needed
  });
  console.log("Connected to DB:", MONGO_URL.includes("mongodb+srv") ? "Atlas" : MONGO_URL);
}

const initDB = async () => {
  try {
    // BE CAREFUL: deletes existing listings in the target DB
    await Listing.deleteMany({});
    // ensure owner id is correct for your users collection; adjust if needed
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "69197cbf10d372aee1f5b9ff" }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

(async () => {
  try {
    await main();
    await initDB();
  } catch (e) {
    console.error("Fatal error:", e);
  } finally {
    // close mongoose connection and exit
    await mongoose.connection.close();
    console.log("Connection closed. Exiting.");
    process.exit(0);
  }
})();
