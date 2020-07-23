const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require('../twist.js');
const prefix = ayarlar.prefix;


var mutelirolu = "💤Muteli" //MUTELENDİGİ ZAMAN VERİLECEK ROLU  BURAYA YAZINIZ...
module.exports.run = async (bot, message, args) => {
if(!message.member.roles.has(`735841755164835912`)) return;

  let mutekisi = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!mutekisi) return message.reply(`:warning: Lütfen bir kullanıcı etiketleyiniz! \nDoğru Kullanım; \`!mute <@kullanıcı> <1sn/1dk/1sa/1g>\``)
  if(mutekisi.hasPermission("MANAGE_MESSAGES")) return message.reply(`:warning: Yetkili bir kişiyi muteleyemem! \nDoğru Kullanım; \`!mute <@kullanıcı> <1sn/1dk/1sa/1g>\``)
  let muterol = message.guild.roles.find(`name`, mutelirolu);
  if(!muterol){
    try{
      muterol = await message.guild.createRole({
        name: mutelirolu,
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutezaman = args[1]
  .replace(`sn`, `s`)
  .replace(`dk`, `m`)
  .replace(`sa`, `h`)
  .replace(`g`, `d`)

  if(!mutezaman) return message.reply(`:warning: Lütfen bir zaman giriniz! \nDoğru Kullanım; \`!mute <@kullanıcı> <1sn/1dk/1sa/1g>\``)
      const sohbetsilindi = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setThumbnail('https://media0.giphy.com/media/hKBFbhNCjYjuw/giphy.gif?cid=ecf05e47b675301f07cecd4ad57d0065490a2785b2f1d15a&rid=giphy.gif')
    .addField('**Eylem: **', 'Susturma')
    .addField('**Yetkili: **', message.author)
    .addField('**Susturulan Kişi: **', message.mentions.users.first())
    .addField('**Susturulma Süresi: **', mutezaman)
    .addField('**Kanal: **', message.channel);

  await(mutekisi.addRole(muterol.id));
  message.reply(` <@${mutekisi.id}> 'yi ${args[1]} boyunca susturdu!`)
  var kanal = bot.channels.get('735590278441730199');
  kanal.send(sohbetsilindi);

  setTimeout(function(){
    mutekisi.removeRole(muterol.id);
    message.channel.send(`<@${mutekisi.id}> kullanıcısının susturulma süresi sona erdi!`);
  }, ms(mutezaman));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sustur"],
    permLevel: 1
  };
  
  exports.help = {
    name: "mute",
    description: "Etiketlediğiniz kişiye belirttiğiniz süre kadar mute atar.",
    usage: "mute <@kullanıcı> <1sn/1dk/1sa/1g>"
  };