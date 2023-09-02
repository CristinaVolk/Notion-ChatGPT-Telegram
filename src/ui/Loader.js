export class Loader {
    constructor(ctx) {
        this.ctx = ctx;
    }

    icons = [
        '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛',
    ];

    message = null;
    interval = null;

    async show () {
        let index = 0;
        this.message = await this.ctx.reply(this.icons[index]);
        this.interval = setInterval(() => {
            index = index < this.icons.length - 1 ? index + 1 : 0;
            this.ctx.telegram.editMessageText(
                this.ctx.chat.id,
                this.message.message_id,
                null,
                this.icons[index]
            )
        }, 500)

    }

    hide () {
        clearInterval(this.interval);
        this.ctx.telegram.deleteMessage(
            this.ctx.chat.id,
            this.message.message_id
        )
    }
}
