const Discord = require('discord.js');
const fs = require('fs');
exports.run = (client, message, args) => {
if(!message.member.roles.has(`735841755651637361`)) return;
  
  const db = require('quick.db');
  
  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
  let kanal = client.channels.get("735243275337990166");
  if (message.mentions.users.size < 1) return message.reply('Uyaracağın kişiyi etiketlemelisin!');
  if (reason.length < 1) return message.reply('Uyarma sebebini yazmadın!');
  if (user.id === message.author.id) return message.reply('Kendini uyaramazsın!');
  
  //if (!message.guild.member(user).roles.has(muteRole)) return message.reply('Bu kişi zaten susturulmuş!');
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField('Yapılan İşlem', 'Uyarma')
  .addField('Uyarılan Kullanıcı', `${user}`)
  .addField('Uyarılan ID', `${user.id}`)  
  .addField('Uyaran Yetkili', `${message.author}`)
  .addField('Uyarı Sebebi', "```" + reason + "```")
  kanal.send(embed);
  
  message.guild.members.get(user.id).send(`<@${user.id}>, \n**${message.guild.name}** adlı sunucuda **${reason}** sebebi ile uyarıldın! \nKuralları çiğnemeye devam eder isen susturulabilir, atılabilir veya yasaklanabilirsin!`)
  
  db.add(`uyarılar_${user.id}`, 1)
  
  const embed2 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`<@${user.id}> adlı kullanıcı **${reason}** sebebi ile başarıyla uyarıldı!`)
  message.channel.send(embed2)
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["warn", "uyarı-ver"],
  permLevel: 1,
    kategori: "moderasyon"
};
exports.help = {
  name: 'uyar',
  category: 'moderasyon',
  description: 'İstediğiniz kişiyi uyarır.',
  usage: 'uyar <@kişi-etiket> <sebep>'
};