const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

async function createMainRooms(guild) {
    const categoryName = 'Пользовательские комнаты';
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
        .setDescription("Привет, я Roomer. Я умею создаю комнаты, для совместных посиделок, важных встреч и не только. Функционал у меня пока что не большой. Но я буду развиваться и помогать Вам.")
        .setColor('#A0C3ED')
        .setAuthor({ name: 'Roomer', iconURL: 'https://cdn.discordapp.com/avatars/444176688960765973/b4ec7f9c5ec73fd08ebb250d69d31e32.webp', url: 'https://roomer.uglycorsa.com/' })
        .addFields(
          { name: '\u200B', value: '\u200B' },
          { name: 'Предложения:', value: 'Если у Вас есть идеи, не стесняйтесь писать и задавать вопросы. На сайте Вы сможете найдете все что Вам нужно.' },
          { name: 'Поддержать проект:', value: 'Вы можете поддержать проект, нажав на соответствующую кнопку внизу. Это мне поможет работать лучше, а так же маштабироваться и придумывать новые функции :)', inline: false },
          { name: 'Добавить на сервер:', value: 'Если хотите добавить меня на свой discord сервер, Вы это можете сделать, нажав на соответствующую кнопку внизу.', inline: false },
        )
        .setTimestamp()
        .setFooter({ text: 'powered by uglycorsa.'});
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('createRoom')
                .setLabel('Создать комнату')
                .setStyle(ButtonStyle.Success),
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
