import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import onCommand from "./handlers/message/onCommand.js";
import onError from "./handlers/message/onError.js";
dotenv.config();

export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", function (msg) {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;
  const text = msg.text;
  console.log(msg);
  

  if (text.startsWith("/")) {
    return onCommand(msg);
  }

  return onError();
});

console.log("Bot ishga tushdi...");