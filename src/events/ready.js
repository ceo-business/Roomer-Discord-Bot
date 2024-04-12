// src/events/ready.js
const { ActivityType, ChannelType } = require('discord.js');

module.exports = {
    name: 'ready',
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        client.user.setPresence({ 
            activities: [{ 
                name: 'за комнатами', 
                type: ActivityType.Watching
            }], 
            status: 'idle' 
        });
    }
};
