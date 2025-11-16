const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wonderlist';

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
try{
  await Listing.deleteMany({});
 initData.data= initData.data.map((obj)=>({...obj,owner:'676e8a0e8404262ec2fdfcd9'}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
}catch (error) {
    console.error("Error initializing data:", error);
  }
};

initDB();