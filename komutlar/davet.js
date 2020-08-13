const Discord = require("discord.js");

exports.run = (client, message, args) => {
  
  if (!message.member.hasPermission("CREATE_INSTANT_INVITE")) return;
  message.channel.createInvite({maxAge: 0}).then(invite => {
    let embed = new Discord.RichEmbed()
    .setThumbnail(client.user.avatarURL)
    .setColor('BLACK')
    .setDescription(`<a:syhkalp:707183183552053378> **Bot Davet Linki [Tıkla](https://discord.com/oauth2/authorize?client_id=733684404635041812&scope=bot&permissions=8) \n<a:syhkalp:707183183552053378> Web Sitemiz [Tıkla](https://menelaos-bot.glitch.me/) \n<a:syhkalp:707183183552053378> Botumuzun Destek Sunucusu [Tıkla](https://discord.gg/w6fXKvX) \n<a:syhkalp:707183183552053378> Botumuzun Oy Linki (Yakında..) [Tıkla]()**`);
    message.channel.send(embed);

  });
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Sunucu Davetini Verir.',
  usage: 'davet'
};