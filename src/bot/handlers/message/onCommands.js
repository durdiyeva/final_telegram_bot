import User from "../../../models/User.js";
import { bot } from "../../bot.js";
import onProfile from "./commands/onProfile.js";
import onStart from "./commands/onStart.js";

async function onCommands(msg) {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;
  const text = msg.text;

  if (text == "/start") {
    return onStart(msg);
  }

  if (text == "/help") {
    return bot.sendMessage(chatId, `Yordam kerakmi, ${firstname}?`);
  }

  // let chatIds = [875054546, 544654665, 4564564];

  // for (let cId of chatIds) {
  //   bot.sendMessage(cId, "Salom");
  // }

  if (text == "/users") {
    const userSoni = await User.countDocuments();

    const allUsers = await User.find();
    bot.sendMessage(chatId, `Foydanuvchilar [${userSoni}]:`);

    console.log(allUsers);
    // bot.sendMessage(chatId, allUsers.toString());

    for (let user of allUsers) {
      bot.sendMessage(chatId, `${user.firstname} -> ${user.chatId}`);
    }
    return;
  }

  if (text == "/profile") {
    return onProfile(msg);
  }

  return bot.sendMessage(chatId, `Xatolik, buyruq topilmadi... /start bosing!`);
}

export default onCommands;