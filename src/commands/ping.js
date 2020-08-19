module.exports = {
  name: 'ping',
  description: 'Ping!',
  /*  eslint-disable no-unused-vars */
  execute(message, args = null) {
    message.channel.send('Pong');
  },
  /*  eslint-enable no-unused-vars */
};
