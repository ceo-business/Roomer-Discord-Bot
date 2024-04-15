const { handleChannelLimitSelection, handleModalSubmit } = require('../utils/handleChannelLimitSelection');

module.exports = {
    name: 'interactionCreate',
    execute(client, interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === 'setUserLimit') {
                handleChannelLimitSelection(interaction);
            }
        } else if (interaction.isModalSubmit()) {
            if (interaction.customId === 'setUserLimitModal') {
                handleModalSubmit(interaction);
            }
        }
    }
};
