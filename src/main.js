import { Telegraf } from 'telegraf';
import config from 'config';
import { message } from 'telegraf/filters';
import { chatGPT } from './chat-gpt.js';

const bot = new Telegraf(config.get('TELEGRAF_TOKEN', {
    handlerTimeout: Infinity,
}))

bot.command('start', ctx => {
    ctx.reply(
        'Welcome to the bot. Please send a message with the key words about your story you want to tell'
    )
});

bot.on(message('text'), async ctx => {
    await chatGPT(ctx.message.text);
    ctx.reply('test');
})

bot.launch();
