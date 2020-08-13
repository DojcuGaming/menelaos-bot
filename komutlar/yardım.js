const Discord = require ("discord.js");
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
const embed = new Discord.RichEmbed()
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor("BLACK")
.setTitle("Menelaos Bot Yardım Menüsü")
.setDescription(" **m!davet-sistemi** \n `Davet Sisteminin Bütün Komutları Hakkında Bilgi Verir` \n**m!moderasyon** \n`Sunucunuzu Yönetebileceğiniz Moderasyon Komutları Hakkında Bilgi Verir` \n**m!eğlence** \n`Botumuzda Bulunan Eğlence Komutları Hakkında Bilgi Verir` \n**m!kullanıcı** \n`Botumuzda Bulunan Kullanıcı Komutlarını Listeler` \n**m!destek-sistemi** \n`Destek Sisteminin Komutları Hakkkındaki Bilgileri Görüntülersiniz` \n**m!mute-sistemi** \n`Mute Sistemi Hakkında Bilgi Verir`")
.addField(`Botumuza Ulaşabileceğiniz Linkler`, `[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=733684404635041812&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/w6fXKvX) **|** [Web Sitemiz](https://menelaos-bot.glitch.me/)`)


message.channel.sendEmbed(embed)
.then; 

};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ["help"], 
    permLevel: 0 
  };
  
  exports.help = {
    name: 'yardım', 
    description: 'The Help Command',
    usage: 'help'
  };
