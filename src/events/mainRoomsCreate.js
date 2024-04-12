const { createMainRooms } = require('../utils/createMainRooms');

module.exports = {
  name: 'guildCreate',
  execute(client, guild) {
    createMainRooms(guild);
  }
};
