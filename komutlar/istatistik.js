const Discord = require('discord.js');

const moment = require('moment');
const { version } = require("discord.js");
const os = require('os');
let cpuStat = require("cpu-stat");
const { stripIndents } = require('common-tags');
require('moment-duration-format');

var ayarlar = require('../ayarlar.json');

exports.run = (bot, message, args) => {
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
        const embedStats = new Discord.RichEmbed()
            .setAuthor(bot.user.username + " | İstatistikler", bot.user.avatarURL)
            .setColor(0x36393F)
            .addField(" Bellek Kullanımı",`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`)
            .addField(" Çalışma Süresi ", `  ${duration}`)
            .addField(" Bot İstatistikleri", stripIndents`
            <a:erkek:726781456210329610> » Kullanıcı: ${bot.guilds.reduce((a, b) => a + b.memberCount, 0).toString()}
            <a:erkek:726781456210329610> » Sunucu: ${bot.guilds.size.toLocaleString()}
            <a:erkek:726781456210329610> » Kanal: ${bot.channels.size.toLocaleString()}
            <a:erkek:726781456210329610> » Ping: ${Math.round(bot.ping)}ms.
            `)
            .addField(" Versiyonlar", stripIndents`
            <a:erkek:726781456210329610> » Discord.js: v${version}
            <a:erkek:726781456210329610> » Node.js: ${process.version}
            `)
            .addField(" CPU Kullanımı", `\`${percent.toFixed(2)}%\``)
        message.channel.send(embedStats)
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ik', 'stats'],
    permLevel: `Yetki gerekmiyor.`
  };
  
  exports.help = {
    name: 'istatistik',
    description: 'Botun istatistiklerini gösterir.',
    usage: 'istatistik'
  };