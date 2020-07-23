const Discord = require(`discord.js`);

 

exports.run = async (client, message, args, bot, guild) => {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`Bu komutu kullanamazsın ticket kanalında olman gerekir.`);

    message.channel.send(`Destek Kanalını kapatmaya emin misin? kapatmak için **evet** yazman yeterli.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Ticket Kapatma isteğin zaman aşımına uğradı.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });



}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kapat",'kapa'],
    permLevel: 0  
  };
  
  exports.help = {
    name: "kapat",
    description: "Destek taleplerini kapatır..",
    usage: "mute <@kullanıcı> <1sn/1dk/1sa/1g>"
  };