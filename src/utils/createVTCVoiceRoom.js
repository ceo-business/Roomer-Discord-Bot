const { ChannelType, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, PermissionFlagsBits } = require('discord.js');

async function createVTCVoiceRoom(client, newState) {
    const guild = newState.guild;
    const user = newState.member.user;
    const userName = user.username;
    const categoryName = `Категория ${userName}`;
    const voiceChannelName = `Комната ${userName}`;
    const textChannelName = `Настройки-комнаты`;
    
    // Создание категории, если она не существует
    const category = await guild.channels.create({
        name: categoryName,
        type: ChannelType.GuildCategory,
        reason: 'Auto-created category for user channels'
    });

    const voiceChannel = await guild.channels.create({
        name: voiceChannelName,
        type: ChannelType.GuildVoice,
        userLimit: 2,
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
        .setDescription("Используйте меню ниже, чтобы изменить лимит пользователей в комнате.")
        .addFields({ name: 'Лимит пользователей', value: '2', inline: false })
        .setColor('#A0C3ED');

    const row = new ActionRowBuilder()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Выберите количество пользователей')
                .addOptions([
                    { label: '2 пользователей', value: '2' },
                    { label: '3 пользователей', value: '3' },
                    { label: '4 пользователей', value: '4' },
                    { label: '5 пользователей', value: '5' },
                    { label: '6 пользователей', value: '6' },
                ]),
        );

    await textChannel.send({ embeds: [embed], components: [row] });
}

module.exports = { createVTCVoiceRoom };
