const Discord = require('discord.js');
const Jimp = require('jimp');
const generator = require('generate-password');
const ayarlar = require("../ayarlar.json");
   
exports.run = async(client, message, args) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
     if(!args[0] || args[0] === 'seviye' || args[0]=== 'zorluk') {
        message.reply(new Discord.RichEmbed().setColor('BLACK').setDescription("Bir zorluk seviyesi seçmelisin.\n **1** - `"+prefix+"şifreçöz kolay/1`\n **2** - `"+prefix+"şifreçöz normal/2`\n **3** - `"+prefix+"şifreçöz zor/3`"))
      }
      if (args[0]=== "kolay" || args[0] === '1') {
        var password = generator.generate({
          length: 15,
          uppercase: false
      });

           if(password.includes('I')) return message.reply(new Discord.RichEmbed().setColor('BLACK').setDescription('Bir hata oluştu. Yeniden deneyiniz (kolay Şeklinde Olmassa Yanındaki Sayıları Deneyin )'))
      if(password.includes('l')) return message.reply(new Discord.RichEmbed().setColor('BLACK').setDescription('Bir hata oluştu. Yeniden deneyiniz (kolay Şeklinde Olmassa Yanındaki Sayıları Deneyin )'))
        

    var background = await Jimp.read("https://cdn.discordapp.com/attachments/541304018920669196/550727696569729044/Adsz.png");
    background.resize(1000, 100)
  var font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
  background.print(font, 60, 20, `${password}`).write(`./sifre.png`);
    message.channel.send(new Discord.Attachment("./sifre.png"));
        let author = message.author;
      const filter = m => m.author.id == author.id 
message.channel.send(`Şifreyi yazmaya çalış! 40 saniye süren var.`)
    message.channel.awaitMessages(filter, {
      max: 1,
      time: 40000,
      errors: ['time']
    }).then(collected => {
      if(collected.first().content !== `${password}`) return message.channel.send("Şifreyi yanlış yazdın ! Oyun bitti.")
      if (collected.first().content === `${password}`) {
        message.channel.send(new Discord.RichEmbed().setColor('BLACK').setDescription("Tebrikler! Şifreyi 40 saniye içinde yazdın!"))
      };
    })
    .catch(e => {
    message.channel.send('Süren bitti.');
    })

    } else if (args[0] === 'normal' || args[0] === '2') {
      var password = generator.generate({
        length: 15,
        numbers: true
    });
      if(password.includes('I')) return message.reply('Bir hata oluştu. Yeniden deneyiniz.')
      if(password.includes('l')) return message.reply('Bir hata oluştu. Yeniden deneyiniz.')

  var background = await Jimp.read("https://cdn.discordapp.com/attachments/541304018920669196/550727696569729044/Adsz.png");
  background.resize(1000, 100)
var font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
background.print(font, 60, 20, `${password}`).write(`./sifre.png`);
  message.channel.send(new Discord.Attachment("./sifre.png"));
        let author = message.author;
      const filter = m => m.author.id == author.id
  message.channel.send("Şifreyi yazmaya çalış! 30 saniye süren var.")
  message.channel.awaitMessages(filter, {
    max: 1,
    time: 30000,
    errors: ['time']
  }).then(collected => {
         if(collected.first().content !== `${password}`) return message.channel.send("Şifreyi yanlış yazdın ! Oyun bitti.")
    if (collected.first().content === `${password}`) {
      message.channel.send(new Discord.RichEmbed().setColor('BLACK').setDescription("Tebrikler! Şifreyi 30 saniye içinde yazdın!"))
    };
  
  })
       .catch(e => {
   message.channel.send(new Discord.RichEmbed().setColor('BLACK').setDescription("Süren bitti."))
    })

    } else if (args[0] === 'zor' || args[0] === '3') {
      var password = generator.generate({
        length: 15,
        numbers: true,
        symbols: true
    });
       if(password.includes('I')) return message.reply('Bir Hata Oluştu Yeniden Deneyiniz (Eğer **zor** Şeklinde Olmassa 3 Olarak Giriniz).')
       if(password.includes('l')) return message.reply('Bir Hata Oluştu Yeniden Deneyiniz (Eğer **zor** Şeklinde Olmassa 3 Olarak Giriniz.')
  var background = await Jimp.read("https://cdn.discordapp.com/attachments/541304018920669196/550727696569729044/Adsz.png");
  background.resize(1000, 100)
var font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
background.print(font, 60, 20, `${password}`).write(`./sifre.png`);
  message.channel.send(new Discord.Attachment("./sifre.png"));
          let author = message.author;
      const filter = m => m.author.id == author.id
  message.channel.send("Şifreyi yazmaya çalış! 20 saniye süren var.")
  message.channel.awaitMessages(filter, {
    max: 1,
    time: 20000,
    errors: ['time']
  }).then(collected => {
         if(collected.first().content !== `${password}`) return message.channel.send(new Discord.RichEmbed().setColor('BLACK').setDescription("Şifreyi yanlış yazdın ! Oyun bitti."))
    if (collected.first().content === `${password}`) {
      message.channel.send(new Discord.RichEmbed().setColor('BLACK').setDescription("Tebrikler! Şifreyi 20 saniye içinde yazdın!"))
    };
  }) 
    .catch(e => {
    message.channel.send(new Discord.RichEmbed().setColor('BLACK').setDescription('Süren bitti.'));
    })

    }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'şifreçöz',
  kategori: "eğlence",
  description: 'Şifre çözersiniz.',
  usage: 'şifreçöz'
};
