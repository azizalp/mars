const Discord = require('discord.js');
const ayarlar = require('../twist.js');


exports.run = async(client, message, args) => {
var prefix = client.ayarlar.prefix;

        const twist = new Discord.RichEmbed()

             .setColor('#fff000')
             .setAuthor(`Komutlar`, client.user.avatarURL) 
             .setThumbnail(client.user.avatarURL)
             .setTimestamp()
             .setDescription('***Komut Menüsü***')
             .addField(`**${prefix}ban**`, `*Seçtiğiniz kişiyi banlar.*`)
             .addField(`**${prefix}duyuru**`,`*Duyuru kanalında duyuru yapar.*`)
             .addField(`**${prefix}kayıt**`, `*Sunucuda kayıtsız üyeleri kayıt eder.*`)
             .addField(`**${prefix}kick**`, `*Seçtiğiniz kişiyi atar.*`)
             .addField(`**${prefix}mute**`, `*Seçtiğiniz kişiyi belirttiğiniz sürede susturur.*`)
             .addField(`**${prefix}uyar**`, `*Seçtiğiniz kişiye uyarı verir.*`)
             .addField(`**${prefix}uyarılar**`, `*Seçtiğiniz kişinin uyarı sayısını gösterir.*`)
             .addField(`**${prefix}uyarısil**`, `*Seçtiğiniz kişinin uyarılarıını sıfırlar.*`)
             .setFooter(`Komutları ${message.author.username} istedi .`, message.author.avatarURL)
        message.delete(0)
        return message.channel.sendEmbed(twist);
}

exports.conf = {
	enabled : true,
	guildOnly : false,
	aliases : ['help'],
	permLevel : 0
}
//codare
exports.help = {
	name : 'yardım',
	description : 'Komut kategorilerini atar',
	usage : '!yardım'
}
