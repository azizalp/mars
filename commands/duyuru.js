const Discord = require('discord.js');
const ayarlar = require('../twist.js');
exports.run = (client, message, args) => {
  let mesaj = args.slice(0).join(' ');
var kişi = message.author;
    var kanal = client.channels.get('735576742781255780');
if(!message.member.roles.has(`735841756351823943`)) return;

if (mesaj.length < 1) return message.channel.send('Birşey Yazmalısınız');
  message.delete();
      const mesajat = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTimestamp()
      .setFooter('MARS ROLEPLAY')
      .setTitle('Mars Roleplay Duyuru Sistemi')
      .setThumbnail('https://i.pinimg.com/originals/a0/f8/18/a0f818bfa179a2aee3c0d6d93893b9a6.gif')
      .setDescription('' + mesaj + '')
kanal.send(mesajat)
kanal.send('@everyone')
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['duyur'],
  permLevel: 0
};
exports.help = {
  name: 'duyuru',
  description: 'Tüm Herkese Mesaj Atar.',
  usage: 'dmduyuru [duyurmak istediğiniz şey]'
};
