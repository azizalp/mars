const Discord = require('discord.js');
exports.run = (client, message, args) => {
if(!message.member.roles.has(`735841748248559728`)) return;
    if (!message.guild) {
        const ozelmesajuyari = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTimestamp()
            .setAuthor(message.author.username, message.author.avatarURL)
            .addField(':warning: **Uyarı** :warning:', '`rol-al` **adlı komutu özel mesajlarda kullanamazsın.**')
        return message.author.sendEmbed(ozelmesajuyari);
    }
    let guild = message.guild
    let rol = message.mentions.roles.first()
    let user = message.mentions.members.first()

    if (!user) return message.reply('**Kimden rol alınacağını yazmadın!**').catch(console.error);
    if (rol.length < 1) return message.reply('**Rolü belirtmedin**');
    if (rol.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Yetki rolleri benim boyumu aşar.');
    if (user.roles.has(rol)) return message.channel.send('*Üyede Rol Yok!*')
const emb = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setThumbnail(client.user.avatarURL)
.setTimestamp()
.setColor(`#fffff0`)
.setFooter(`#${message.channel.name} kanalında kullanıldı.`)

message.guild.members.get(user.id).removeRole(rol.id)
    var kanal = client.channels.get('735604512886226985');
kanal.send(
emb.addField(`İşlem:`,`**Rol Alma**`)
.addField(`Kişi:`, `${user}`)
.addField(`Yetkili:`, message.author, true)
.addField(`Alınan rol:`, rol, true))
    const embed = new Discord.RichEmbed()
        .setDescription(`${user} kullanıcısından başarıyla ${rol} rolü alındı!`)
        .setFooter('Mars Roleplay', client.user.avatarURL)
        .setColor("RANDOM")
        .setTimestamp()
    message.channel.send({ embed })
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['rolal','role-remove'],
    permLevel: 3
};

exports.help = {
    name: 'rol-al',
    description: 'İstediğiniz kişiden istediğiniz rolü alır.',
    usage: 'rol-al [kullanıcı] [@rol]'
};