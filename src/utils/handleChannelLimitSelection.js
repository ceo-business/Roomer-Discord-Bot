const { ChannelType } = require('discord.js');

async function handleChannelLimitSelection(interaction) {
  const userLimit = interaction.values[0];
  const voiceChannel = interaction.guild.channels.cache.find(c => c.type === ChannelType.GuildVoice && c.name.startsWith(`Комната ${interaction.user.username}`));

  if (voiceChannel) {
      await voiceChannel.setUserLimit(parseInt(userLimit));
      
      const embed = interaction.message.embeds[0];
      embed.data.fields[0].value = userLimit; // Обновляем значение лимита пользователей в embed

      await interaction.update({ embeds: [embed] }); // Обновляем сообщение, сохраняя меню для дальнейших изменений
  } else {
      await interaction.reply({ content: `Ошибка: голосовой канал не найден.`, ephemeral: true, fetchReply: true });
  }
}

module.exports = { handleChannelLimitSelection };