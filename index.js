import "./src/bot/bot.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

// .env configured
dotenv.config();

async function connectDb() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(`Db is connected...`);
    })
    .catch(() => {
      console.log(`Error: Db is not connected...`);
    });
}

connectDb();

console.log("Dastur ishga tushmoqda... ");