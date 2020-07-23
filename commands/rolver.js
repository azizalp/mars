const Discord = require("discord.js");
const data = require('quick.db');
exports.run = async (client, message, args) => {// chimp#6907
//if(!message.member.hasPermission(`ADMINISTRATOR`)) return;
// Sadece role sahip olanlar kullansın istiyorsanız 4. satır yerine:
if(!message.member.roles.has(`735841748248559728`)) return;
  
if(!args[0]) return message.channel.send(`Bir kişiyi etiketlemelisin.`)
  
let role = message.mentions.roles.first()
if(!role) return message.channel.send('Lütfen verilecek rolü etiketleyerek tekrar deneyin.')
let channel = message.guild.channels.get(`735604512886226985`) || message.channel// Log kanal id girin, boş bırakırsanız komutun kullanıldığı kanala logu yollar.
if (role.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Yetki rolleri benim boyumu aşar.');
if (role.hasPermission('ADMINISTRATOR')) return message.channel.send('Sen kafayı yedin herhalde?');


let kullanıcı = message.mentions.users.first()
if(!kullanıcı) return message.channel.send(`${args[0]}, kullanıcısını sunucuda bulamıyorum.`)
if(kullanıcı.bot) return;

  
const emb = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setThumbnail(client.user.avatarURL)
.setTimestamp()
.setColor(`#fffff0`)
.setFooter(`#${message.channel.name} kanalında kullanıldı.`)

message.guild.members.get(kullanıcı.id).addRole(role)

channel.send(
emb.addField(`İşlem:`,`**Rol Verme**`)
.addField(`Kişi:`, `${kullanıcı}`)
.addField(`Yetkili:`, message.author, true)
.addField(`Verilen rol:`, role, true))
// Çok isterseniz botun yolladığı mesaja tepki ekleyebilirsiniz.
// .then(m => m.react(``))
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rolver', 'rolekle','role-add','r'],
  permLevel: "3"
};

exports.help = {
  name: "rolver",
  description: "Kişilere Rol Yetkisi Verir",
  usage: "rolver <mesaj>"
};