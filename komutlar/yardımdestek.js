const Discord = require ("discord.js");
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
const embed = new Discord.RichEmbed()
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor("BLACK")
.setTitle("Menelaos Bot Yardım Menüsü")
.setDescription("**m!destek-rol** \n`Destek Kanalını Görebilecek Rolü Ayarlarsınız` \n**m!destek-kanal** \n`Destek Komutunu Kullanacakları Kanalı Ayarlarsınız` \n**m!destek-sistem aç/kapat** \n`Destek Sistemini Açar Veya Kapatırsınız`")
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
    name: 'destek-sistemi', 
    description: 'The Help Command',
    usage: 'help'
  };
