const Discord = require('discord.js');
const db = require('quick.db');

exports.run = (client,message,args) => {
const roletiketle = message.mentions.roles.first() || args.slice(0).join(' ')
if(!roletiketle) return message.channel.send('Lütfen bir rol etiketle!')


db.set(`destekrol_${message.guild.id}`, roletiketle.id)
message.channel.send('Destek rolü başarıyla ayarlandı.')
}

exports.conf = {
enable: true,
guildOnly: false,
permLevel: 2,
aliases: ['destek-rol-ayarla',"destek-rol"]
}

exports.help = {
name: 'destekrol-ayarla'	
}