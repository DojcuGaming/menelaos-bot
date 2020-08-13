const Discord = require ("discord.js");
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
const embed = new Discord.RichEmbed()
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor("BLACK")
.setTitle("Menelaos Bot Yardım Menüsü")
.setDescription("**m!rol-koruma** \n`Rol Koruma Sistemini Aktif Edersiniz` \n**m!rol-koruma-sıfırla** \n `Rol Koruma Sistemini Sıfırlarsınız`\n**m!ever-engel** \n`Everyone Atan Kişilerin Mesajını Silip 3 Ten Fazla Atan Kişileri Sunucudan Atar` ")
.addField(`Botumuza Ulaşabileceğiniz Linkler`, `[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=733684404635041812&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/w6fXKvX) **|** [Web Sitemiz](https://menelaos-bot.glitch.me/)`)


message.channel.sendEmbed(embed)
.then; 

};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: [], 
    permLevel: 0 
  };
  
  exports.help = {
    name: 'koruma', 
    description: 'The Help Command',
    usage: 'help'
  };
