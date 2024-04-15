const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

async function createMainRooms(guild) {
    const categoryName = 'Приватные комнаты';
    const voiceChannelName = 'Создать комнату';
    const textChannelName = 'Информация';

    const category = await guild.channels.create({
        name: categoryName,
        type: ChannelType.GuildCategory,
        reason: 'Auto-created main category for creating rooms'
    });

    const voiceChannel = await guild.channels.create({
        name: voiceChannelName,
        type: ChannelType.GuildVoice,
        parent: category,
        reason: 'Auto-created main voice channel for creating rooms'
    });

    const textChannel = await guild.channels.create({
        name: textChannelName,
        type: ChannelType.GuildText,
        parent: category,
        reason: 'Auto-created main text channel for creating rooms',
        permissionOverwrites: [
          {
              id: guild.id, // Разрешения для @everyone
              deny: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.CreatePrivateThreads, PermissionFlagsBits.CreatePublicThreads], // Запрещаем отправку сообщений
              allow: [PermissionFlagsBits.ViewChannel] // Разрешаем просмотр канала
          },
          {
              id: guild.roles.everyone.id, // Уточнение для @everyone, также можно использовать конкретный ID роли администратора
              deny: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.CreatePrivateThreads, PermissionFlagsBits.CreatePublicThreads],
              allow: [PermissionFlagsBits.ViewChannel]
          },
          {
              id: guild.roles.cache.find(role => role.permissions.has(PermissionFlagsBits.Administrator)).id, // Разрешения для администраторов
              allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel] // Разрешаем отправку сообщений и просмотр канала
          }
      ]
    });

    const embed = new EmbedBuilder()
        .setTitle("Информация")
        .setDescription("Привет, я Roomer. Я умею создаю комнаты, для совместных посиделок, важных встреч и не только.")
        .setColor('#A0C3ED')
        .setAuthor({ name: 'Roomer', iconURL: 'https://cdn.discordapp.com/avatars/444176688960765973/b4ec7f9c5ec73fd08ebb250d69d31e32.webp', url: 'https://roomer.uglycorsa.com/' })
        .addFields(
          // { name: '\u200B', value: '\u200B' },
          { name: 'Инструкция:', value: 'Чтобы создать **Приватную комнату**, нажмите на голосовой канал **Создать комнату**' },
        )
        // .setTimestamp()
        .setFooter({ text: 'powered by uglycorsa.'});
    const row = new ActionRowBuilder()
        .addComponents(
                new ButtonBuilder()
                .setLabel('Добавить бота на свой сервер')
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.com/oauth2/authorize?client_id=444176688960765973'),
                new ButtonBuilder()
                .setLabel('Поддержать проект')
                .setStyle(ButtonStyle.Link)
                .setURL('https://boosty.to/roomer/'),
            new ButtonBuilder()
                .setLabel('Сайт')
                .setStyle(ButtonStyle.Link)
                .setURL('https://roomer.uglycorsa.com/')
        );

    await textChannel.send({ embeds: [embed], components: [row] });
}

module.exports = {createMainRooms};
