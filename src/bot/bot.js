import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import onCommands from "./handlers/message/onCommands.js";
import onError from "./handlers/message/onError.js";
dotenv.config();
const CHANNEL_ID = "@IT_Park91";

export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", async function (msg) {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;
  const text = msg.text;

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
                text: "Bot 91 Channel",
                url: "https://t.me/IT_Park91",
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

  return onError();
});

bot.on("callback_query", async function (query) {
  const msg = query.message
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;
  const data = query.data;

  const messageId = msg.message_id

  if (data == "confirm_subscription") {
    const chatMember = await bot.getChatMember(CHANNEL_ID, chatId);

    console.log(chatMember);

    if (chatMember.status == "kicked" || chatMember.status == "left") {
      return bot.answerCallbackQuery(query.id, {
        text: `Siz hali obuna bo'lmadingiz... ❌`,
        show_alert: true
      })
    } else {

      bot.deleteMessage(chatId, messageId)

       return bot.sendMessage(
      chatId,
      `
          👋 Assalomu alaykum, ${firstname}!
  
  📚 100x Academy o‘quv markazining rasmiy botiga xush kelibsiz!
  
  Bu bot orqali siz:
  • Kurslarimiz haqida batafsil ma’lumot olasiz  
  • Kurslarga onlayn ro‘yxatdan o‘tishingiz mumkin  
  • Jadval va to‘lovlar haqida ma’lumot olasiz  
  
  Quyidagi menyudan kerakli bo‘limni tanlang 👇
  
          `,
      {
        reply_markup: {
          keyboard: [
            [{ text: "📚 Kurslar" }, { text: "✍️ Ro‘yxatdan o‘tish" }],
            [{ text: "ℹ️ Markaz haqida" }, { text: "💬 Fikr bildirish" }],
            [{ text: "❓ Yordam" }],
          ],
          resize_keyboard: true,
        },
      }
    );
    }
  }
});

console.log("Bot ishga tushdi...");