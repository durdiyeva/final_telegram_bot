import User from "../../../../models/User.js";
import { bot } from "../../../bot.js";

async function onProfile(msg) {
  const chatId = msg.chat.id;

  let user = await User.findOne({ chatId: chatId });

  console.log(user);

  if (!user) return;

  user = await User.findOneAndUpdate({ chatId: chatId }, { action: "profile" });

  return await bot.sendMessage(
    chatId,
    `
Mening Profilim:\n
|--chatId: ${user.chatId}
|--ism: ${user.firstname} 
|--username: ${user.username}
|--active: ${user.active}
|--balance: ${user.balance}
|--action: ${user.action}
|___________
    `
  );
}

export default onProfile;