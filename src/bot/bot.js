import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import onCommands from "./handlers/message/onCommands.js";
import onError from "./handlers/message/onError.js";
import onCourses from "./handlers/message/onCourses.js";
import User from "../models/User.js";
dotenv.config();
const CHANNEL_ID = "@academy_100x_uz";
const ADMIN_ID = 875072364;

export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", async function (msg) {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;
  const text = msg.text;

  let user = await User.findOne({ chatId });

  const chatMember = await bot.getChatMember(CHANNEL_ID, chatId);

  console.log(chatMember);

  if (chatMember.status == "kicked" || chatMember.status == "left") {
    return bot.sendMessage(
      chatId,
      `Oldin shu kanalga obuna bo'ling @academy_100x_uz`,
      {
        reply_markup: {
          remove_keyboard: true,
          inline_keyboard: [
            [
              {
                text: "100x Academy Xiva",
                url: "https://t.me/academy_100x_uz",
              },
            ],
            [
              {
                text: "Obunani tasdiqlash ✅",
                callback_data: "confirm_subscription",
              },
            ],
          ],
        },
      }
    );
  }

  if (text.startsWith("/")) {
    return onCommands(msg);
  }

  if (text == "📚 Kurslar") {
    return onCourses(msg);
  }

  if (text == "✍️ Ro‘yxatdan o‘tish") {
    if (!user) return;

    user = await User.findOneAndUpdate({ chatId }, { action: "awaiting_name" });

    return bot.sendMessage(chatId, `Ismingizni kiriting:`);
  }

  // action
  if (user.action == "awaiting_name") {
    console.log("name: ", text);

    user = await User.findOneAndUpdate(
      { chatId },
      { action: "awaiting_phone", name: text }
    );

    return bot.sendMessage(chatId, `Telefon nomeringiz kiriting:`);
  }

  if (user.action == "awaiting_phone") {
    console.log("phone: ", text);

    user = await User.findOneAndUpdate(
      { chatId },
      { action: "finish_registration", phone: text }
    );

    bot.sendMessage(
      ADMIN_ID,
      `Yangi xabar 🔔\n--FIO: ${user.name}\n--Telefon: ${text}`
    );

    return bot.sendMessage(chatId, `Tabriklaymiz siz ro'yhatdan o'tdingiz! ✅`);
  }

  return onError();
});

bot.on("callback_query", async function (query) {
  const chatId = query.message.chat.id;
  const firstname = query.message.chat.first_name;
  const data = query.data;

  if (data == "confirm_subscription") {
    const chatMember = await bot.getChatMember(CHANNEL_ID, chatId);

    console.log(chatMember);

    if (chatMember.status == "kicked" || chatMember.status == "left") {
      return bot.sendMessage(
        chatId,
        `Oldin shu kanalga obuna bo'ling @academy_100x_uz`,
        {
          reply_markup: {
            remove_keyboard: true,
            inline_keyboard: [
              [
                {
                  text: "100x Academy Xiva",
                  url: "https://t.me/academy_100x_uz",
                },
              ],
              [
                {
                  text: "Obunani tasdiqlash ✅",
                  callback_data: "confirm_subscription",
                },
              ],
            ],
          },
        }
      );
    }
  }
});

console.log("Bot ishga tushdi...");