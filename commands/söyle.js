const Discord = require("discord.js");
const google = require("google-tts-api");
const ayarlar = require('../twist.js');
let prefix = '!';
exports.run = (client, message) => {
if (!message.member.hasPermission("MANAGE_MESSAGES")) return
let kanal = message.guild.channels.get(`735854688645283881`)
      const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send(`İlk önce bir sesli kanala girmeniz gerek`)
    google(`${args.slice('')} asd`, 'tr', 1).then(url => {
        message.member.voiceChannel.join().then(connection => {
            connection.playStream(url).on("end", () => {
                connection.disconnect();
                message.delete()
            })
        })
    })
    const sohbetsilindi = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .addField('**Eylem: **', 'Bota Söyletme')
    .addField('**Yetkili: **', message.author)
    .addField('**Söylenen Metin**', args.slice(''))
    .addField('**Kanal: **', voiceChannel)
    return kanal.send(sohbetsilindi);
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: 'söyle',
    description: 'Bota yazdığınız şeyi sesli mesaj olarak söyletir',
    usage: 'söyle <mesaj>'
};