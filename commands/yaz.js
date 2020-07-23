const Discord = require('discord.js');

exports.run = (client, message, args) => {
let kanal = message.guild.channels.get(`735844145620582432`)
  let mesaj = args.slice(0).join(' ');
if (!message.member.hasPermission("MANAGE_MESSAGES")) return
if (mesaj.length < 1) return message.reply('Yazmam için herhangi bir şey yazmalısın.');
  message.delete();
  message.channel.send(mesaj);

    const sohbetsilindi = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .addField('**Eylem: **', 'Bota Yazdırma')
    .addField('**Yetkili: **', message.author)
    .addField('**Yazılan Metin**', mesaj)
    .addField('**Kanal: **', message.channel)
    return kanal.send(sohbetsilindi);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yaz', 'yazdır'],
  permLevel: 0
};

exports.help = {
  name: 'yaz',
  description: 'İstediğiniz şeyi bota yazdırır.',
  usage: 'yaz [yazdırmak istediğiniz şey]'
};
