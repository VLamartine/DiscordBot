const Discord = require('discord.js');
const fs = require('fs');
const { prefix } = require('./const.json');

require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync(`${__dirname}/commands/`)
  .filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) {
    message.reply('Este comando não existe');
    return;
  }
  try {
    client.commands.get(command).execute(message, args);
  } catch (e) {
    console.log(e);
    message.reply('Erro ao executar comando');
  }
});

client.login(process.env.BOT_TOKEN);
