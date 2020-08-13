const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const { version } = require("discord.js");
const os = require('os');
let cpuStat = require("cpu-stat");
const { stripIndents } = require('common-tags');
require('moment-duration-format');

var prefix = ayarlar.prefix;



module.exports = client => {

  console.log('[------------] 🌞FuryX🌞 [-------------]');
  console.log(`${client.guilds.size} adet sunucuya hizmet veriyor`);
  console.log(`${client.users.size} kullaniciya hizmet veriyor`);
  console.log(`${client.channels.size} kanala hizmet veriyor`);
  console.log(`Coder By NightWish`);
  console.log("Prefix: " + prefix);
  console.log("Bot ID'si: " + client.user.id);
  console.log("Bot Isim: " + client.user.username);
  console.log('[------------] FuryX [-------------]'); 
  client.user.setStatus("online");
   var oyun = [
       "m!yardım m!davet",
  `${client.guilds.size} Sunucu + ${client.users.size} Kullanıcıya Hizmet Veriyoruz`
    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setActivity(oyun[random], "https://www.youtube.com/s");
        }, 2 * 2500);
}