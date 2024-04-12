const { handleChannelLimitSelection } = require('../utils/handleChannelLimitSelection');
const { createVTCButton } = require('../utils/createVTCButton');

module.exports = {
    name: 'interactionCreate',
    execute(client, interaction, newState) {
        if (interaction.isSelectMenu()) {
            handleChannelLimitSelection(interaction);
        }
        if (interaction.isButton()) {
          if (interaction.customId === 'createRoom') {
            createVTCButton(interaction);
          }
        }
    }
};
