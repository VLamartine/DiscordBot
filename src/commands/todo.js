require('dotenv').config();

module.exports = {
  name: 'todo',
  description: 'todo',
  needsMongoClient: true,
  execute(message, _) {
    message.reply('Comando não implementado ainda');
  },
};
