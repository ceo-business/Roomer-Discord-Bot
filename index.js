const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { registerEvents } = require('./src/app');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

registerEvents(client);
client.login(token);
