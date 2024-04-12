async function checkEmptyVC(oldState) {
  if (oldState.channel && oldState.channel.members.size === 0 && oldState.channel.deletable && oldState.channel.name !== "Создать комнату") {
    const category = oldState.channel.parent;
    if (category) {
        const channels = category.children.cache.values();
        for (const channel of channels) {
            await channel.delete('Removing empty channel');
        }
        await category.delete('Removing empty category');
    }
}
}

module.exports = { checkEmptyVC };
