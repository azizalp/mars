const Discord = require("discord.js");
const db = require("quick.db");
const talkedRecently = new Set();


module.exports.run = async (bot, message, args,client) => {
if(!message.member.roles.has(`735841757769629718`)) return;
           if (talkedRecently.has(message.author.id)) {
    message.delete(0)
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('***Ban Koruması Devrede***')
.setDescription('*Yalnızca 30 dakikada 1 ban atabilirsin.Bu sunucuyu korumak için aldığımız bir karardır!*');  
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
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";

  if (!message.member.hasPermission("MANAGE_ROLES")) {
    const embed = new Discord.RichEmbed()
      .setDescription("```Ne yazık ki bu komutu kullanmaya yetkin yok.```")
      .setColor("BLACK");
 
    message.channel.send(embed);
    return;
  }
 
  let u = message.mentions.users.first();
  if (!u) {
    message.delete(0)
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("Lütfen sunucudan yasaklanacak kişiyi etiketleyiniz!")
        .setColor("BLACK")
        .setFooter(bot.user.username, bot.user.avatarURL)
    );
     message.delete(0)
  }

    const sohbetsilindi = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .addField('***İşlem Onaylandı ve şahıs sunucudan yasaklandı!***',  '*Elveda.*')
    .setImage('https://media0.giphy.com/media/qPD4yGsrc0pdm/giphy.gif?cid=ecf05e47ca52d0393b15e58dccf3828739ac6839ac5fc270&rid=giphy.gif');

    const banlog = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setThumbnail('https://media0.giphy.com/media/e3WNjAUKGNGoM/giphy.gif')
    .addField('**Eylem: **', 'Kullanıcı Yasaklama')
    .addField('**Yetkili: **', message.author)
    .addField('**Yasaklanan: **', u)
    .addField('**Yasaklanan Id: **', u.id)
    .addField('**Kanal: **', message.channel)

  const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`${u} Adlı şahsın yasaklanmasını onaylıyor musunuz?`)
    .setImage('https://media2.giphy.com/media/DotBLv0VRwTD2/giphy.gif?cid=ecf05e47ca52d0393b15e58dccf3828739ac6839ac5fc270&rid=giphy.gif')
    .setTimestamp();
  message.channel.send(embed).then(async function(sentEmbed) {
    const emojiArray = ["✅"];
    const filter = (reaction, user) =>
      emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
    await sentEmbed.react(emojiArray[0]).catch(function() {});
    var reactions = sentEmbed.createReactionCollector(filter, {
      time: 30000
    });
    reactions.on("end", () => sentEmbed.edit("İşlem iptal oldu! 30 dakika bekleme süresine girdin."));
    reactions.on("collect", async function(reaction) {
      if (reaction.emoji.name === "✅") {
        message.channel.send(sohbetsilindi)
    var kanal = bot.channels.get('735587863978311770');
    return kanal.send(banlog);
        ;
 
        message.guild.ban(u, 2);
      }
    });
  });
};

module.exports.conf = {
  aliases: [],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};
 
module.exports.help = {
  name: "ban",
  description: "ban",
  usage: "ban"
};