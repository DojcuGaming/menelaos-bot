const db = require("quick.db")
const Discord = require('discord.js');

exports.run = function(client, message, args) {

  var USER = message.author;
  var REASON = args.slice(0).join("  ");
  if(!REASON) return message.channel.send(new Discord.RichEmbed().setColor("BLACK").setDescription("**AFK olmak için bir sebep belirtin.**"));
  
  db.set(`afk_${USER.id}`, REASON);
  db.set(`afk_süre_${USER.id}`, Date.now());
  message.channel.send(new Discord.RichEmbed().setColor("BLACK").setDescription("**Başarıyla afk moduna girdiniz.**"))
  
};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'afk', 
  description: 'Kullanıcııyı afk moduna sokar.',
  usage: 'afk <sebep>'
};