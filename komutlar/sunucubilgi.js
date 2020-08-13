  const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {

    if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('<a:uyar:707183175587070022> Uyarı <a:uyar:707183175587070022>', '`sunucubilgi` adlı komutu özel mesajlarda kullanamazsın.')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setColor('BLACK')
    .setTimestamp()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .addField('<a:592664642862710788:707183182696546357> » Ad:', message.guild.name)
    .addField('<a:592664642862710788:707183182696546357> » ID', message.guild.id)
    .addField('<a:592664642862710788:707183182696546357> » Ana kanal:', message.guild.defaultChannel)
    .addField('<a:592664642862710788:707183182696546357> » Bölge', message.guild.region)
    .addField('<a:592664642862710788:707183182696546357> » Üye sayısı:', message.guild.memberCount)
    .addField('<a:592664642862710788:707183182696546357> » Sahibi:', message.guild.owner + ' (' + message.guild.ownerID +  ')')
    .addField('<a:592664642862710788:707183182696546357> » Kanal sayısı:', message.guild.channels.size)
    .addField('<a:592664642862710788:707183182696546357> » Oluşturulma tarihi:', message.guild.createdAt)
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sunucu', 'sunucu bilgi', 'sbilgi',"sunucu-bilgi"],
  permLevel: 0
};

exports.help = {
  name: 'sunucubilgi',
  description: 'Sunucu hakkında bilgi verir.',
  usage: 'sunucubilgi'
};