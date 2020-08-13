const Discord = require('discord.js');
const db = require('quick.db');

exports.run = (client,message,args) => {
const kanal = message.mentions.channels.first() || args.slice(0).join(' ')
if(!kanal) return message.channel.send('Lütfen bir kanal etiketle!')


db.set(`destekkanal_${message.guild.id}`, kanal.id)
message.channel.send('Destek kanalı başarıyla ayarlandı.')
}

exports.conf = {
enable: true,
guildOnly: false,
permLevel: 2,
aliases: ["destek-kanal"]
}

exports.help = {
name: 'destek-kanal-ayarla'	
}