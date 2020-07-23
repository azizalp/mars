const Discord = require("discord.js");
const data = require('quick.db');
exports.run = async (client, message, args) => {// chimp#6907
//if(!message.member.hasPermission(`ADMINISTRATOR`)) return;
// Sadece role sahip olanlar kullansın istiyorsanız 4. satır yerine:
if(!message.member.roles.has(`735841759510396989`)) return;
  
if(!args[0]) return message.channel.send(`Bir kişiyi etiketlemelisin.`)
  
let role = message.mentions.roles.first()
if(!role) return message.channel.send('Lütfen verilecek rolü etiketleyerek tekrar deneyin.')
let unregistered = message.guild.roles.get(`735841759980027975`)// Kayıtsız rol id
let channel = message.guild.channels.get(`735576809151791115`) || message.channel// Log kanal id girin, boş bırakırsanız komutun kullanıldığı kanala logu yollar.

let kullanıcı = message.mentions.users.first()
if(!kullanıcı) return message.channel.send(`${args[0]}, kullanıcısını sunucuda bulamıyorum.`)
if(kullanıcı.bot) return;
  
let isim = args[1];
if(!isim) return message.channel.send(`${args[0]}, için bir isim girmelisin.`)
if(isim.length > 20) return message.channel.send(`Daha kısa bir isim yaz.`)

  
const emb = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setThumbnail(client.user.avatarURL)
.setTimestamp()
.setColor(`#fffff0`)
.setFooter(`#${message.channel.name} kanalında kullanıldı.`)

message.guild.members.get(kullanıcı.id).setNickname(`${isim}`)
message.guild.members.get(kullanıcı.id).addRole(role.id)
message.guild.members.get(kullanıcı.id).removeRole(unregistered.id)
channel.send(
emb.setDescription(`${kullanıcı}, kullanıcısı kayıt edildi.`)
.addField(`Kayıt eden:`, message.author, true)
.addField(`Verilen Ad:`, args[1], true)
.addField(`Verilen rol:`, role, true)
.addField(`Alınan rol:`, unregistered, true))
// Çok isterseniz botun yolladığı mesaja tepki ekleyebilirsiniz.
// .then(m => m.react(``))
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayıt',"k"],
  permLevel: 1
};

exports.help = {
  name: 'kayıt'
};//