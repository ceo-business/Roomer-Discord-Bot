const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, PermissionFlagsBits } = require('discord.js');

async function createVTCVoiceRoom(client, newState) {
    const guild = newState.guild;
    const user = newState.member.user;
    const userName = user.username;
    const categoryName = `Категория ${userName}`;
    const voiceChannelName = `Комната ${userName}`;
    const textChannelName = `Настройки-комнаты`;

    const category = await guild.channels.create({
        name: categoryName,
        type: ChannelType.GuildCategory,
        reason: 'Auto-created category for user channels'
    });

    const voiceChannel = await guild.channels.create({
        name: voiceChannelName,
        type: ChannelType.GuildVoice,
        userLimit: 0,
        parent: category.id
    });

    const textChannel = await guild.channels.create({
        name: textChannelName,
        type: ChannelType.GuildText,
        parent: category.id,
        permissionOverwrites: [
          {
              id: guild.id,
              deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.CreatePrivateThreads, PermissionFlagsBits.CreatePublicThreads],
          },
          {
              id: user.id,
              allow: [PermissionFlagsBits.ViewChannel],
              deny: [PermissionFlagsBits.SendMessages],
          }
      ]
    });

    // Перемещение пользователя в только что созданный голосовой канал
    await newState.setChannel(voiceChannel);

    const embed = new EmbedBuilder()
        .setTitle("Меню комнаты")
        .setDescription("Нажмите кнопку ниже, чтобы изменить лимит пользователей в вашей комнате.")
        .addFields({ name: 'Текущий лимит пользователей', value: 'без ограничений', inline: false })
        .setColor('#A0C3ED');

    const row = new ActionRowBuilder()
      .addComponents(
            new ButtonBuilder()
          .setCustomId('setUserLimit')  // Убедитесь, что это ID совпадает в обработчике
          .setLabel('Лимит пользователей')
          .setStyle(1),
        );

        const message = await textChannel.send({ embeds: [embed], components: [row] });
        const messageId = message.id;
}

module.exports = { createVTCVoiceRoom };
