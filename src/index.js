const Discord = require('discord.js');
const fs = require('fs');
const { prefix } = require('./const.json');
const { MongoClient } = require('mongodb');

// mongodb+srv://discordbot:<password>@discordbot.l6wd7.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority
require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@discordbot.l6wd7.gcp.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

const mongoClient = new MongoClient(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

try {
  mongoClient.connect();
} catch (e) {
  console.log(e);
}

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
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) {
    message.reply('Este comando não existe');
    return;
  }
  try {
    const command = client.commands.get(commandName);
    if (command.needsMongoClient) {
      command.execute(message, args, mongoClient);
    } else {
      command.execute(message, args);
    }
  } catch (e) {
    console.log(e);
    message.reply('Erro ao executar comando');
  }
});

client.login(process.env.BOT_TOKEN);
