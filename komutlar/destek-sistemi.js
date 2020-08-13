const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
var ayarlar = require("../ayarlar.json");

const aç = ["aç", "open","on"];
const kapat = ["kapat","off","close"];

exports.run = async(client, message, args) => {

   if(!args[0]) return message.channel.send(new Discord.RichEmbed().setDescription("Aç yada kapat yazmalısın!"))
   
  if(aç.includes(args[0])){
    
    message.channel.send(new Discord.RichEmbed().setColor('BLACK').setDescription("Destek sistemi başarıyla açıldı."))
    
    db.set(`desteksistemi_${message.guild.id}`, "açık")
    
  }
   
     if(kapat.includes(args[0])){
    
    message.channel.send(new Discord.RichEmbed().setColor('BLACK').setDescription("Destek sistemi başarıyla kapatıldı."))
    
    db.delete(`desteksistemi_${message.guild.id}`)
    
  
   }
     
  
   
};

exports.conf = {
  enabled: true,
  guildOnly: true,
permLevel: 2,
  aliases: ["desteks"]
};

exports.help = {
  name: "destek-sistem"
};