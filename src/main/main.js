import { Telegraf } from 'telegraf';
import config from 'config';
import { message } from 'telegraf/filters';
import { chatGPT } from '../api-integrations/chat-gpt.js';
import { create } from "../api-integrations/notion.js";
import { Loader } from "../ui/Loader.js";

const bot = new Telegraf(config.get('TELEGRAF_TOKEN', {
    handlerTimeout: Infinity,
}))

bot.command('start', ctx => {
    ctx.reply(
        'Welcome to the bot. Please send a message with the key words about your story you want to tell'
    )
});

bot.on(message('text'), async ctx => {
    try {
        const userKeywords = ctx.message.text;
        if (!userKeywords.trim()) {
            ctx.reply('The text cannot be empty')
        }
        const loader = new Loader(ctx);
        loader.show();

        const response = await chatGPT(userKeywords);
        if (!response) {
            return ctx.reply('The error with API', response)
        }

        const notionResponse = await create(userKeywords, response.content);
        loader.hide();
        ctx.reply(`Your page: ${notionResponse.url}`);
    } catch (err) {
        console.log('Error while processing text: ', err.message);
    }
})

bot.launch();
