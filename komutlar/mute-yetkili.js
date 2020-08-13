const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client,message,args) => {

const asd = message.mentions.roles.first() || args.slice(0).join(' ')
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Sunucuyu Yönet** iznine sahip olmalısın!`);

if(!asd) return message.channel.send(new Discord.RichEmbed().setColor('BLACK').setDescription('Lütfen rol etiketleyin <a:uyar:727132991821709322>'))

db.set(`muteyetkilirol_${message.guild.id}`, asd.id)
message.channel.send(new Discord.RichEmbed().setColor('BLACK').setDescription(`Başarıyla mute yetkili rolü **${asd}** olarak ayarlandı <a:onayland:727131309574717450>`))
}

exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 2,
aliases: ["mute-yetkili"]

}

exports.help = {
name: 'mute-yetkili-rol' ,
category:'Mod'   
}
