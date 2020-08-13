const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "PinkCode 7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//---------------------------------KOMUTLAR---------------------------------\\
//Davet Sistemi Başlangıç
const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
  if (!kanal) return;
  let veri = await db.fetch(`rol1_${member.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
  let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
  let veri2 = await db.fetch(`rol2_${member.guild.id}`);
  let d = await db.fetch(`bunudavet_${member.id}`);
  const sa = client.users.get(d);
  const sasad = member.guild.members.get(d);
  let sayı2 = await db.fetch(`davet_${d}_${member.guild.id}`);
  db.add(`davet_${d}_${member.guild.id}`, -1);

  if (!d) {
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs aramızdan ayrıldı.\nŞahsı davet eden:** \`\`Bulunamadı!\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    return;
  } else {
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs aramızdan ayrıldı.\nŞahsı davet eden:** \`\`${sa.tag}\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);

    if (!veri) return;

    if (sasad.roles.has(veri)) {
      if (sayı2 <= veri12) {
        sasad.removeRole(veri);
        return;
      }
    }
    if (sasad.roles.has(veri2)) {
      if (!veri2) return;
      if (sayı2 <= veri21) {
        sasad.removeRole(veri2);
        return;
      }
    }
  }
});

client.on("guildMemberAdd", async member => {
  member.guild.fetchInvites().then(async guildInvites => {
    let veri = await db.fetch(`rol1_${member.guild.id}`);
    let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
    let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
    let veri2 = await db.fetch(`rol2_${member.guild.id}`);
    let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const sasad = member.guild.members.get(invite.inviter.id);
    const davetçi = client.users.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let sayı = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let sayı2;
    if (!sayı) {
      sayı2 = 0;
    } else {
      sayı2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);
    }

    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs sunucuya katıldı.\nŞahsı davet eden:** \`\`${davetçi.tag}\`\`\n**Toplam \`\`${sayı2}\`\` daveti oldu!**`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    if (!veri) return;

    if (!sasad.roles.has(veri)) {
      if (sayı2 => veri12) {
        sasad.addRole(veri);
        return;
      }
    } else {
      if (!veri2) return;
      if (sayı2 => veri21) {
        sasad.addRole(veri2);
        return;
      }
    }
  });
});
//Davet Sistemi Bitiş
//@Everyone-Here Engel Başlangıç
client.on("message", async message => {
  let ever = await db.fetch(`ever_${message.guild.id}`);
  let sayı = await db.fetch(`sayi_${message.author.id}`);
  if (ever === "acik") {
    const a = message.content;
    if (a === "@everyone" || a === "@here") {
      if (message.member.hasPermission("BAN_MEMBERS")) return;
      db.add(`sayi_${message.author.id}`, 1);
      if (sayı == null) {
        const embed = new Discord.RichEmbed()
          .setColor("BLACK")
          .setDescription(
            "Bu 1. uyarın! Lütfen tekrarlama! Aksi taktirde atılacaksın!\n(1/3)"
          )
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        message.delete();
        return;
      }
      if (sayı === 1) {
        const embed = new Discord.RichEmbed()
          .setColor("BLACK")
          .setDescription(
            "Bu 2. uyarın! Lütfen tekrarlama! Aksi taktirde atılacaksın!\n(2/3)"
          )
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        message.delete();
        return;
      }
      if (sayı > 2) {
        message.delete();
        const embed = new Discord.RichEmbed()
          .setColor("BLACK")
          .setDescription("Sunucudan atılıyorsun!")
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        db.delete(`sayi_${message.author.id}`);
        message.member.kick();
        return;
      }
    }
  } else {
    return;
  }
});
//@Everyone-here engel bitiş
//Sayaç Başlangıç
client.on("guildMemberAdd", async member => {
  let sayac = db.get(`sayac.${member.guild.id}`);
  if (!sayac) return;
  let kanal = client.channels.get(sayac.kanal);
  if (!kanal) return db.delete(`sayac.${member.guild.id}`);
  kanal.send(new Discord.RichEmbed().setColor("BLACK").setDescription(`**<a:we:734300961748811796> ${member.user.tag} sunucuya katıldı Sunucu şu an ${member.guild.memberCount} kişi. ${sayac.sayi} kişi olmamıza ${sayac.sayi - member.guild.memberCount} kişi kaldı!**`));
  
  if (member.guild.memberCount >= sayac.sayi) {
    kanal.send(new Discord.RichEmbed().setColor("BLACK").setDescription(`**Sunucu, sayaç hedefine ulaştı**<a:supreme:733614004584579112>`));
    db.delete(`sayac.${member.guild.id}`);
  };
});

client.on("guildMemberRemove", async member => {
  let sayac = db.get(`sayac.${member.guild.id}`);
  if (!sayac) return;
  let kanal = client.channels.get(sayac.kanal);
  if (!kanal) return db.delete(`sayac.${member.guild.id}`);
  kanal.send(new Discord.RichEmbed().setColor("BLACK").setDescription(`**<a:ex:734300960318291999> ${member.user.tag} sunucudan ayrıldı! Sunucu şu an ${member.guild.memberCount} kişi. ${sayac.sayi} kişi olmamıza ${sayac.sayi - member.guild.memberCount} kişi kaldı!**`));
});
//Sayaç Bitiş
//Otorol Başlangıç
client.on("guildMemberAdd", async member => {
  let rol = await db.fetch(`otorol_${member.guild.id}`);
  let kanal = await db.fetch(`otokanal_${member.guild.id}`);
  let msj = await db.fetch(`otorolmsj_${member.guild.id}`);
  if (!rol) return;
  if (!kanal) return;

  member.addRole(rol);
  if (!msj) {
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `- <a:we:734300961748811796>  **@${member.user.tag}** adlı şahsa rolü verildi! `
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  } else {
    var msj2 = msj
      .replace(`-sunucu-`, `${member.guild.name}`)
      .replace(`-uye-`, `${member.user.tag}`)
      .replace(`-uyetag-`, `<@${member.user.id}>`)
      .replace(`-rol-`, `${member.guild.roles.get(rol).name}`);
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(msj2)
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  }
});
//Otorol Bitiş
//Giriş-Çıkış
client.on("guildMemberAdd", async(member) => {
    let resimlihgbb = await db.fetch(`giriş_${member.guild.id}`);
    if(resimlihgbb) {
      const gözelkanal = member.guild.channels.get(db.fetch(`giriş_${member.guild.id}`))
      if(gözelkanal) {
      let username = member.user.username;
        if(gözelkanal.type === "text") {
          const bg = await Jimp.read("https://cdn.discordapp.com/attachments/499911418896973824/500023171827761154/guildAdd_2.png");
          const userimg = await Jimp.read(member.user.avatarURL ? member.user.avatarURL : client.user.avatarURL);
          var font;
          if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
          else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
          else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
          await bg.print(font, 430, 170, member.user.tag);
          await userimg.resize(362, 362);
          await bg.composite(userimg, 43, 26).write("./img/"+ client.user.username + "Hosgeldin.png");
          setTimeout(function () {
            if(member.user.id === ayarlar.sahip){
              gözelkanal.send(new Discord.Attachment("./img/" + client.user.username + "Hosgeldin.png"))
              gözelkanal.send("İşte Bak! Kurucum sunucuya giriş yaptı.")
            } else {    
              gözelkanal.send(new Discord.Attachment("./img/" + client.user.username + "Hosgeldin.png"));
            }
          }, 1000);
          setTimeout(function () {
            fs.unlinkSync("./img/" + client.user.username + "Hosgeldin.png");
          }, 10000);
        }
      }
    }
})

client.on("guildMemberRemove", async(member) => {
    let resimlihgbb = await db.fetch(`giriş_${member.guild.id}`);
    if(resimlihgbb) {
        const gözelkanal = member.guild.channels.get(db.fetch(`giriş_${member.guild.id}`))
    if (gözelkanal) {
        let username = member.user.username;
        if (gözelkanal.type === "text") {            
            const bg = await Jimp.read("https://cdn.discordapp.com/attachments/499911418896973824/500023173459345416/guildRemove_2.png");
            const userimg = await Jimp.read(member.user.avatarURL ? member.user.avatarURL : client.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ client.user.username + "Gorusuruz.png");
              setTimeout(function () {
                if(member.user.id === ayarlar.sahip){
                  gözelkanal.send(new Discord.Attachment("./img/" + client.user.username + "Gorusuruz.png"))
                  gözelkanal.send("Kurucum sunucunuzdan ayrıldı..")
                } else {
                  gözelkanal.send(new Discord.Attachment("./img/" + client.user.username + "Gorusuruz.png"));
                }
              }, 1000);
              setTimeout(function () {
                fs.unlinkSync("./img/" + client.user.username + "Gorusuruz.png");
              }, 10000);
        }
    }
  }
})
//Giriş-Çıkış Bitiş
//Afk-Başlangıç
const ms = require("parse-ms");
client.on("message", async message => {
  
  if(message.author.bot) return;
  if(!message.guild) return;
  if(message.content.includes(`${prefix}afk`)) return;
  
  if(await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);
    message.reply(new Discord.RichEmbed().setColor("BLACK").setDescription("**Başarıyla afk modundan çıktınız.**"));
  }
  
  var USER = message.mentions.users.first();
  if(!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);
  
  if(REASON) {
    let süre = await db.fetch(`afk_süre_${USER.id}`);
    let timeObj = ms(Date.now() - süre);
    message.channel.send(new Discord.RichEmbed().setColor("BLACK").setDescription(`${USER.tag} kullanıcısı AFK\n AFK süresi: ${timeObj.hours}h ${timeObj.minutes}m ${timeObj.seconds}s\nSebep:\n **${REASON}**` ))
  }
});
//Afk-bitiş
//Sa-As Başlangıç
client.on("message", async message => {
  const a = message.content.toLowerCase();
  if (
    a === "slam" ||
    a === "sa" ||
    a === "selamun aleyküm" ||
    a === "selamın aleyküm" ||
    a === "selam" ||
    a === "slm"
  ) {
    let i = await db.fetch(`saas_${message.guild.id}`);
    if (i === "acik") {
      const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription(
          `**Aleyküm Selam Hoşgeldin Kral <a:erkek:726781456210329610>**`
        )

      message.channel.send(embed).then(msg => msg.delete(5000));
    }
  }
});
//Sa-as Bitiş
//Reklam-Engel Başlangıç
client.on("message", async message => {
  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`reklam_${message.guild.id}`);
  let kullanici = message.member;
  if (!reklamkick) return;
  if (reklamkick == "Açık") {
    const reklam = [
      "discord.app",
      "discord.gg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az",
      ".ml"
    ];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        db.add(`reklamuyari_${message.author.id}`, 1); //uyarı puanı ekleme
        if (uyarisayisi === null) {
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("Menelaos Reklam-Engel!")
            .setDescription(
              `**<@${message.author.id}> Reklam yapmayı kes! bu ilk uyarın! (1/3)**`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari).then(msg => msg.delete(5000));
        }
        if (uyarisayisi === 1) {
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("Menelaos Reklam-Engel!")
            .setDescription(
              `**<@${message.author.id}> Reklam yapmayı kes! bu ikinci uyarın! (2/3)**`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari).then(msg => msg.delete(5000));
        }
        if (uyarisayisi === 2) {
          message.delete();
          await kullanici.kick({
            reason: `Reklam-Engel sistemi!`
          });
          let uyari = new Discord.RichEmbed()
            .setColor("BLUE")
            .setTitle("Menelaos Reklam-Engel!")
            .setDescription(
              `**<@${message.author.id}> Üç Kere Reklam Yaptığı İçin Sunucudan Atıldı!**`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 3) {
          message.delete();
          await kullanici.ban({
            reason: `Menelaos Reklam-Engel sistemi!`
          });
          db.delete(`reklamuyari_${message.author.id}`);
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("Menelaos Reklam kick sistemi")
            .setDescription(
              `**<@${message.author.id}> atıldıktan sonra tekrar reklam yaptığı için sunucudan yasaklandı!**`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
      }
    }
  }
});
//Reklam-Engel Bitiş
//Destek-Sistemi Başlangıç
client.on("message", async(message) => {



   const i = await db.fetch(`desteksistemi_${message.guild.id}`, true)
    if(i) {

if (message.content.toLowerCase() === 'm!destek') {
let kanal1 = await db.fetch(`destekkanal_${message.guild.id}`)
let kategöri = db.get(`destekkg_${message.guild.id}`)
if (message.channel.id != kanal1) return message.channel.send(new Discord.RichEmbed().setColor('BLACK').setDescription(`Bu komudu sadece <#${kanal1}> kanalında kullanabilirsin.`)).then(msg => msg.delete(10000))
if(message.channel.id == kanal1)  {
    if (message.guild.channels.exists("name", `destek-` + message.author.id)) return message.channel.send(new Discord.RichEmbed().setColor('BLACK').setDescription(`Bir yardım talebine zaten sahipsin.`));
  if (!message.guild.channels.filter(c => c.type === 'category').find(c => c.name === `${kategöri}`)) {

        message.guild.createChannel(`destek-${message.author.id}`, "text").then(c => {
let destekrol = db.get(`destekrol_${message.guild.id}`)
        let role = message.guild.roles.find("id", `${destekrol}`);
          let role2 = message.guild.roles.find("name", "@everyone");
          c.overwritePermissions(role, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          c.overwritePermissions(role2, {
              SEND_MESSAGES: false,
              READ_MESSAGES: false
          });
https://paste.ee/p/eJxxg
          c.overwritePermissions(message.author, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
         
          message.channel.send(new Discord.RichEmbed().setColor('BLACK').setDescription(`:white_check_mark: Yardım talebiniz oluşturuldu, ${c}.`));
          const embed = new Discord.RichEmbed()
          .setColor(0xCF40FA)
          .addField(`Hey ${message.author.username}!`, `Yardım talebini neden açtığınızı açıkca anlatın. Destek ekibi en kısa zamanda cevap verecektir @everyone`)
.addField(`kapatmak için`,`m!kapat yazınız.`)
          .setTimestamp();
          c.send({ embed: embed });
c.setParent(`${kategöri}`)
      }).catch(console.error);
  }
    }
}
if (message.content.toLowerCase().startsWith(prefix + `kapat`)) {
    if (!message.channel.name.startsWith(`destek-`)) return message.channel.send(new Discord.RichEmbed().setColor('BLACK').setDescription(`Yardım talebinizi yardım talebi kanalınızın dışındaki kanallarda kapatamazsınız.`));

    message.channel.send(new Discord.RichEmbed().setColor('BLACK').setDescription(`Emin misin? Onayladıktan sonra geri alınamaz!\nOnaylamak için,\`onayla\`. Yazmak için 10 saniyen var yoksa kendiliğinden iptal olur.`))
    .then((m) => {
      message.channel.awaitMessages(response => response.content === 'onayla', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })


      .then((collected) => {

          message.channel.delete();
message.guild.channels.delete();
        })
        .catch(() => {
          m.edit('Kapatma talebinin zamanı geçti yardım talebin kapatılmadı.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}
    }
});
//Destek Sistmei Bitiş
//Küfür-Engel Başlangıç
client.on("message", async msg => {
  db.fetch(`kufur_${msg.guild.id}`).then(i => {
if (i == 'Açık') {
        const kufur = ["amk","a.m.k","am","a.m","m.k","mk","orosbu çocugu","orospu çocugu","o.ç","oç","oc","o.c","orosbu","orospu","veledi zina","sikerim","sıkerım","s.i.k.e.r.i.m","s.ı.k.e.r.ı.m","piç","pıc","p.i.ç","p.ı.c","orosbu evladı","orospu evladı","amına koyayım","babanı sikim"];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  
     
               
               msg.delete(); 
             

                  return msg.reply('Küfür Etmemelisin.').then(msg => msg.delete(3000));
             }
          } catch(err) {
            console.log(err);
          }
        } } else if (i == 'Kapalı') {

}

})
});
//Küfür-Engel Bitiş
//Eklendim-Atıldım Başlangıç
client.on('guildDelete', guild => {

let rrrsembed = new Discord.RichEmbed()

.setColor("RED")
.setTitle(" Bot Kickledi ")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.get('735769285795905577').send(rrrsembed);
  
});


client.on('guildCreate', guild => {

let rrrsembed = new Discord.RichEmbed()

.setColor("GREEN")
.setTitle(" Bot Eklendi ")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.get('735769285795905577').send(rrrsembed);
  
});

//Eklendim-Atıdlım Bitiş