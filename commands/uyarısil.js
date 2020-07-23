const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
exports.run = (client, message, args) => {
if(!message.member.roles.has(`735841755651637361`)) return;
  
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('Uyarılarını kaldıracağın kişiyi etiketlemelisin!');
  
  if (db.has(`uyarılar_${user.id}`) === false) return message.reply("Bu kullanıcının hiç uyarısı bulunmuyor!")
  
  db.delete(`uyarılar_${user.id}`)
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${user.username} - Uyarı Bilgisi`, user.avatarURL)
  .setDescription(`<@${user.id}> adlı kullanıcının başarıyla uyarıları kaldırıldı!`)
  .setFooter(`${client.user.username} - Uyarı Sistemi`, client.user.avatarURL)
  message.channel.send({embed})
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["warnd-delete", "uyarı-sil",'uyarıkaldır'],
  permLevel: 3,
    kategori: "moderasyon"
};
exports.help = {
  name: 'uyarı-kaldır',
  category: 'moderasyon',
  description: 'İstediğiniz kişinin uyarılarını kaldırır.',
  usage: 'uyarı-kaldır <@kullanıcı>'
};