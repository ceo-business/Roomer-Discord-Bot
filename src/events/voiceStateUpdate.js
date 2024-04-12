const { createVTCVoiceRoom } = require('../utils/createVTCVoiceRoom');
const { checkEmptyVC } = require('../utils/checkEmptyVC');

module.exports = {
    name: 'voiceStateUpdate',
    execute(client, oldState, newState) {
        if (newState.channel && newState.channel.name === "Создать комнату") {
          createVTCVoiceRoom(client, newState);
        }
        checkEmptyVC(oldState);
    }
};
