const Discord = require('discord.js');
const botconfig = require('../ayarlar.json');

exports.run = (client, message, params) => {
	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor('BLACK')
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**bu kod**')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor(message.author.username + ' Kafa Dansı Saldırısı!')
    .setColor('BLACK')
    .setTimestamp()
    .setDescription('')
		.setImage(`https://cdn.discordapp.com/emojis/396521772758990851.gif?v=1`)
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kafadansı',
  description: 'Bot kafa dansı yapar!',
  usage: 'kafa-dansi'
};