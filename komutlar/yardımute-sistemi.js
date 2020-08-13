const Discord = require ("discord.js");
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
const embed = new Discord.RichEmbed()
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor("BLACK")
.setTitle("Menelaos Bot Yardım Menüsü")
.setDescription("**m!mute-yetkili** \n `Mute Komutunu Kullanabilecek Yetkiliyi Ayarlarsınız`\n**m!mute-log** \n`Mute Atınca Mute Bilgilerini Ayarlanan Log Kanalına Atar` \n**m!mute** \n`Etiketlediğiniz Kullanıcıyı Belirttiğiniz Süre Boyunca Susturur` \n**Not:  Mute Atıcağınız Kişiyi Etiketledikten Sonra Boşluk Bırakmayın Discord Otomatik Bir Boşluk Bırakır Zaten**")
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
    name: 'mute-sistemi', 
    description: 'The Help Command',
    usage: 'help'
  };
