module.exports = {
  name: 'ping',
  description: 'Ping!',
  /*  eslint-disable no-unused-vars */
  execute(message, args = null) {
    /*  eslint-enable no-unused-vars */
    message.channel.send('Pong');
  },
};
