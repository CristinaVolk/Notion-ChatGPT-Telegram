import OpenAI from "openai";
import config from "config";

const openai = new OpenAI({
    apiKey: config.get('OPENAI_KEY')
});
const CHAT_GPT_MODEL = 'gpt-3.5-turbo';

const ROLES = {
    ASSISTANT: "assistant",
    SYSTEM: "system",
    USER: "user"
}

const getMessage = (message) => {
    return `
    Write an emotional and consistent message based on the following keywords: ${message}
    
    Write an emotional and consistent message based on the following keywords. 
    These keywords are the key moments of my day and what I have done for the day. 
    The story should be emotional enough so I could remember it and tell it to my friends later and in future. 
    It should not be a very long story with lots of text. 
    The important and required aspects are emotions, correct consistency and referring to the context.
    `
}

export async function chatGPT (message = "") {
    const messages = [
        {
            role: ROLES.SYSTEM,
            content: 'You are an experienced copywriter, who writes short emotional articles for social media.',
        },
        {
            role: ROLES.USER,
            content: getMessage(message)
        },

    ]
    try {
        const completion =  await openai.chat.completions.create({
            messages,
            model: CHAT_GPT_MODEL
        })

        return completion.choices[0].message;
    } catch (err) {
        console.error('Error occurred during the chat completion', err.message)
    }
}
