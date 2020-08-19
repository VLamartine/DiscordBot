module.exports = {
  name: 'tts',
  description: 'tts',
  needsMongoClient: false,
  execute(message, args) {
    const oldNick = message.guild.me.nickname;
    message.guild.me.setNickname(message.author.username);
    message.channel.send(args.join` `, { tts: true });
    message.delete();
    message.guild.me.setNickname(oldNick);
  },
};
