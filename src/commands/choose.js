module.exports = {
  name: 'choose',
  description: 'Choose a random option',
  needsMongoClient: false,
  execute(message, args) {
    args = args.join` `.split`,`;
    const optionIndex = Math.floor(Math.random() * args.length);
    message.channel.send(
      `A opção escolhida foi \`\`\`${args[optionIndex]}\`\`\``
    );
  },
};
