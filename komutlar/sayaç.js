const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(new Discord.RichEmbed().setColor("BLACK").setDescription('**Bu Komutu Kullanabilmek İçin Sunucuyu Yönet Yetkisine Sahip Olmalısın** <a:carp:727134538848927816>'));
  if (!args[0]) return message.reply(new Discord.RichEmbed().setColor("BLACK").setDescription(`Yapılacak işlemi belirtmelisin!\n${this.help.usage}`));
  let sayac = db.get(`sayac.${message.guild.id}`);
  if (args[0] === "sıfırla") {
    if (!sayac) return message.reply(new Discord.RichEmbed().setColor("BLACK").setDescription('**Sayaç zaten ayarlanmamış** <a:carp:727134538848927816>'));
    db.delete(`sayac.${message.guild.id}`);
    message.reply(new Discord.RichEmbed().setColor("BLACK").setDescription('**Başarıyla sayaç sıfırlandı** <a:onayland:727131309574717450>'));
    return;
  };
  
  let kanal = message.mentions.channels.first();
  let sayi = args[1];
  if (!kanal || !sayi || isNaN(sayi)) return message.reply(new Discord.RichEmbed().setColor("BLACK").setDescription(`**Sayacı düzgün ayarlamalısın!\nDoğru Kullanım: ${this.help.usage}** <a:carp:727134538848927816>`));
  if (sayi < message.guild.memberCount) return message.reply(new Discord.RichEmbed().setColor("BLACK").setDescription(`**Girdiğin sayaç hedefi, sunucunun toplam üyesinden düşük (${message.guild.memberCount})** <a:carp:727134538848927816>`));
  db.set(`sayac.${message.guild.id}`, {kanal: kanal.id, sayi: Number(sayi)});
  message.reply(new Discord.RichEmbed().setColor("BLACK").setDescription(`**Başarıyla sayaç kanalı  ${kanal} olarak, sayaç sayısı ise ${sayi} olarak ayarlandı** <a:onayland:727131309574717450>`));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = { 
  name: 'sayaç', 
  description: 'Sayım yapar.',
  usage: 'sayaç #kanal [sayı]/sıfırla',
  kategori: 'yetkili'
};