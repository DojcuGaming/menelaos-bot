const Discord = require ("discord.js");
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
const embed = new Discord.RichEmbed()
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor("BLACK")
.setTitle("Menelaos Bot Yardım Menüsü")
.setDescription("**m!adamasmaca**\n`Adamasmaca Oynarsınız`\n**m!alkış**\n`Alkışlarsınız`\n**m!alivefa**\n`Sunucudaki Alivefayı Gösterir`\n**m!aşkölçer**\n`Etiketlediğiniz Kullanıcı İle Aranızdaki Sevgiyi Ölçer`\n**m!boks-makinası**\n`Boks Makinesine Ne Kadar Güçlü Vurduğunuzu Hesaplar`\n**m!fal**\n`Falınıza Bakarsınız`\n**m!ilginçbilgi**\n`İlginç Bİlgiler Öğrenirsiniz`\n**m!kafadansı**\n`Çılgınlarca Kafadansı Yaparsınız`\n**m!korkut**\n`Etiketlediğiniz Kişiyi Korkutursunuz`\n**m!kapaklaflar**\n`Bot Etiketlediğiniz Kişiye Kapak Laflar Söyler`\n**m!koş**\n`Koşma Gifi Atar`\n**m!rip**\n`Etiketlediğiniz Kullacının Avatarına Rip Efekti Ekler`\n**m!tekmeat**\n`Etiketlediğiniz Kullanıcıya Tekme Atarsınız`\n**m!şifreçöz**\n`Belirttiğiniz Derecedeki Şifreyi Verilen Saniye İçinde Çözmeye Çalışırsınız`")      
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
    name: 'eğlence', 
    description: 'The Help Command',
    usage: 'he'
  };
