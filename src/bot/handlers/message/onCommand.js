import User from "../../../models/user.js";
import { bot } from "../../bot.js";

async function onCommand(msg) {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;
  const text = msg.text;

  if (text == "/start") {
    const existingUser = await User.findOne({ chatId: chatId });

    if (!existingUser) {
      const newUser = new User({
        chatId: chatId,
        firstname: firstname,
        username: msg.chat.username,
      });

      newUser.save();
    } else {
      console.log(existingUser);
    }

    return bot.sendMessage(
      chatId,
      `Assalomu aleykum, xush kelibsiz, ${firstname}`
    );
  }

  if (text == "/help") {
    return bot.sendMessage(chatId, `Yordam kerakmi, ${firstname}?`);
  }

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
    const existingUser = await User.findOne({ chatId: chatId });

    console.log(existingUser);

    return bot.sendMessage(
      chatId,
      `
Mening Profilim:\n
|--chatId: ${existingUser.chatId}
|--ism: ${existingUser.firstname} 
|--username: ${existingUser.username}
|--active: ${existingUser.active}
|--balance: ${existingUser.balance}
|___________
    `
    );
  }

  return bot.sendMessage(chatId, `Xatolik, buyruq topilmadi... /start bosing!`);
}

export default onCommand;