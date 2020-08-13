const Discord = require ("discord.js");
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
const embed = new Discord.RichEmbed()
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor("BLACK")
.setTitle("Menelaos Bot Yardım Menüsü")
.setDescription("**m!ban** \n`Etiketlediğiniz Kullanıcı Sunucudan Banlar` \n**m!kick** \n`Etiketlediğiniz Kullanıcıyı Sunucudan Atar` \n**m!sil** \n`Yazdıgınız Kanal Da Belirttiğiniz Sayı Kadar Mesaj Siler`\n**m!resimlihgbb** \n`Resimli Hoşgeldin Hoşçakal Kanalını Ayarlar`\n**m!sayaç** \n`Etiketlediğiniz Kanalda Belirttiğiniz Kullanıcı Sayısına Ulaşana Kadar Sunucuya Üye Geldikçe O Kanala Kaç Kişi Kaldığını Söyler` \n**m!otorol aç/sıfırla** \n`Otomatik Rol Verme Sistemini Aktif Edersiniz Veya Sıfırlarsınız ` \n**m!reklam-engel aç/kapat** \n`Reklam Engelleme Sistemini Aktif Edersiniz Kullanıcı 3 Kere Reklam Atarsa Sunucudan Atılır`\n**m!kanalkilit** \n`Komutu Kullandığınız Kanalı Belirttiğiniz Süre Boyunca Kilitler`")
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
    name: 'moderasyon', 
    description: 'The Help Command',
    usage: 'help'
  };
