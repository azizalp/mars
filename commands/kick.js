const Discord = require("discord.js");
const db = require("quick.db");
const talkedRecently = new Set();

module.exports.run = async (bot, message, args) => {
if(!message.member.roles.has(`735841758809948191`)) return;
           if (talkedRecently.has(message.author.id)) {
    message.delete(0)
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('***Kick Koruması Devrede***')
.setDescription('*Yalnızca 30 dakikada 1 kişiyi atabilirsin.Bu sunucuyu korumak için aldığımız bir karardır!*');  
           return message.member.send(embed);
    } else {

           // the user can type the command ... your command code goes here :)

        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(message.author.id);
        setTimeout(() => {
        message.delete();
          talkedRecently.delete(message.author.id);
        }, 1800000);
    }
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "?";
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    const embed = new Discord.RichEmbed()
      .setDescription("```Ne yazık ki bu komutu kullanmaya yetkin yok.```")
      .setColor("BLACK");
     message.delete(0)
 
    message.channel.send(embed);
    return;
  }
 
  let u = message.mentions.users.first();
  if (!u) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("Lütfen atılacak kişiyi etiketleyiniz!")
        .setColor("BLACK")
        .setFooter(bot.user.username, bot.user.avatarURL)
    );
     message.delete(0)

  }
     const sohbetsilindi = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .addField('***İşlem Onaylandı ve şahıs sunucudan atıldı!***',  '*Elveda.*');
  const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`${u} Adlı şahsın sunucudan atılmasını onaylıyor musunuz?`)
    .setFooter(bot.user.username, bot.user.avatarURL)
    .setImage('https://media2.giphy.com/media/DotBLv0VRwTD2/giphy.gif?cid=ecf05e47ca52d0393b15e58dccf3828739ac6839ac5fc270&rid=giphy.gif');

  message.channel.send(embed).then(async function(sentEmbed) {
    const emojiArray = ["✅"];
    const filter = (reaction, user) =>
      emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
    await sentEmbed.react(emojiArray[0]).catch(function() {});
    var reactions = sentEmbed.createReactionCollector(filter, {
      time: 30000
    });
    reactions.on("end", () => sentEmbed.edit("İşlem iptal oldu! 30 Dakika bekleme süresine girdin."));
     message.delete(0)
    reactions.on("collect", async function(reaction) {
      if (reaction.emoji.name === "✅") {
        message.channel.send(sohbetsilindi
        );
     const banlog = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setThumbnail('https://media0.giphy.com/media/e3WNjAUKGNGoM/giphy.gif')
    .addField('**Eylem: **', 'Kullanıcı Atma')
    .addField('**Yetkili: **', message.author)
    .addField('**Atılan: **', u)
    .addField('**Atılan Id: **', u.id)
    .addField('**Kanal: **', message.channel)
            var kanal = bot.channels.get('735588468343963773');
        kanal.send(banlog)
        message.guild.member(u).kick();
      }
    });
  });
};

module.exports.conf = {
  aliases: ['at'],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};
 
module.exports.help = {
  name: "kick",
  description: "kick",
  usage: "kick"
};