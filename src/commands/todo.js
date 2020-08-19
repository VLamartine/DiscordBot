require('dotenv').config();

module.exports = {
  name: 'todo',
  description: 'todo',
  needsMongoClient: true,
  async execute(message, args, mongoClient) {
    const task = {
      user: message.author.username,
      description: args.join` `,
    };
    const result = await mongoClient
      .db(process.env.MONGO_DATABASE)
      .collection('todo')
      .insertOne(task);

    message.reply(`tarefa adicionada à lista com id: ${result.insertedId}`);
  },
};
