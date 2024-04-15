const { ChannelType, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

async function handleChannelLimitSelection(interaction) {
    // Создание модального окна для ввода лимита пользователей
    const modal = new ModalBuilder()
        .setCustomId('setUserLimitModal')
        .setTitle('Установка лимита пользователей');

    // Поле для ввода числа пользователей
    const numberInput = new TextInputBuilder()
        .setCustomId('userLimitInput')
        .setLabel('Введите новый лимит пользователей:')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('0')
        .setMinLength(0) // Минимальная длина ввода 1 символ
        .setMaxLength(2); // Максимальная длина ввода 2 символа

    const firstActionRow = new ActionRowBuilder().addComponents(numberInput);

    modal.addComponents(firstActionRow);

    // Отправляем модальное окно пользователю
    await interaction.showModal(modal);
}

async function handleModalSubmit(interaction) {
  const userInput = interaction.fields.getTextInputValue('userLimitInput');
  const userLimit = parseInt(userInput);

  // Проверка на валидность введённого числа
  if (isNaN(userLimit) || userLimit < 0 || userLimit > 99) {
      await interaction.reply({
          content: 'Пожалуйста, введите число от 0 до 99.',
          ephemeral: true
      });
      return; // Прерываем выполнение, чтобы не обновлять лимит
  }

  const voiceChannel = interaction.guild.channels.cache.find(c => c.type === ChannelType.GuildVoice && c.name.startsWith(`Комната ${interaction.user.username}`));
  if (voiceChannel) {
      await voiceChannel.setUserLimit(userLimit);

      // Обновляем embed сообщение с новым лимитом
      const messages = await interaction.channel.messages.fetch({ limit: 10 });
      const embedMessage = messages.find(m => m.embeds.length > 0 && m.embeds[0].title === "Меню комнаты");
      if (embedMessage) {
          const embed = embedMessage.embeds[0];
          embed.fields[0].value = `${userLimit === 0 ? "без ограничений" : userLimit}`;
          await embedMessage.edit({ embeds: [embed] });
      }

      await interaction.reply({ content: `Лимит пользователей установлен на ${userLimit === 0 ? "без ограничений" : userLimit}.`, ephemeral: true });
  } else {
      await interaction.reply({ content: `Ошибка: голосовой канал не найден.`, ephemeral: true });
  }
}








module.exports = { handleChannelLimitSelection, handleModalSubmit };
