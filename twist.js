const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require("chalk");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const http = require("http");
const express = require("express");
require("./util/eventLoader")(client);

client.ayarlar = {
  token: "NzM1NTgyMDEyNzM1MzU3MTI3.XxiWcQ.npWvfOn9LwXrnt7uAn_eeVJ8B8o",
  prefix: "!",
  sahip: "713838415388344393"
};

const app = express();
app.get("/", (request, response) => {
  console.log();
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = client.ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Yüklenen komut: ${client.ayarlar.prefix}${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 1;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 2;
  if (message.author.id === message.guild.owner.id) permlvl = 3;
  if (message.author.id === client.ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.login(client.ayarlar.token);

client.on("ready", async () => {
  client.user.setActivity("🌟 Mars Roleplay!");
  client.user.setStatus("idle");
});
function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}
client.on("message", message => {
  if (message.channel.id !== "735577372014936253") return;
  let everyone = message.guild.roles.find(r => r.name === `@everyone`);
  let yetkili = message.guild.roles.find(x => x.id === "735580211235782806");
  let reason = message.content;
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("***Mars Roleplay Destek Talebi***")
    .addField("***Destek İsteme Sebebiniz :***", " *" + reason + "*")
    .addField(
      "*Yetkili ekibimiz sizinle en kısa sürede ilgilenecektir.*",
      "*Beklediğiniz için teşekkür ederiz.*"
    )
    .addField("*Talebi kapatmak için kullanacağınız komut:*", "!kapat")
    .addField("**Destek İsteyen :**" + " ", message.author)
    .setTimestamp();
  message.delete(0);
  if (message.guild.channels.exists("name", "ticket-" + message.author.id))
    return message.author.send(`Zaten açık durumda bir ticketin var.`);

  message.guild
    .createChannel("ticket-" + message.author.id, { type: "text" })
    .then(channel => {
      channel.overwritePermissions(message.author, {
        SEND_MESSAGES: true,

        READ_MESSAGE_HISTORY: true,

        VIEW_CHANNEL: true
      }),
        channel.send(embed);
      var kanal = client.channels.get("735576279738220656");
      kanal.send(embed);
      channel.overwritePermissions(yetkili, {
        VIEW_CHANNEL: true
      });

      channel.overwritePermissions(everyone, {
        VIEW_CHANNEL: false
      });
      channel.send("@everyone");
    });
});
client.on("message", msg => {
  var dm = client.channels.get("735576190387093555"); //mesajın geleceği kanal idsi//
  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) return;
    const botdm = new Discord.RichEmbed()
      .setTitle(`${client.user.username} Dm`)
      .setTimestamp()
      .setColor("BLUE")
      .setThumbnail(
        `https://cdn.discordapp.com/attachments/735576799223742575/735592591579545730/ana-gorsel-mars-burcu-listelist-750x375_1.jpg`
      )
      .addField(":boy: Gönderen ", msg.author)
      .addField(":id:  Gönderen ID :", msg.author.id)
      .addField(":globe_with_meridians: Gönderilen Mesaj", msg.content);

    dm.send(botdm);
  }
  if (msg.channel.bot) return;
});
