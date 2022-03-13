const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const prefix = config.prefix;
const token = process.env.TOKEN

const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING"
    ]
});

module.exports = client;

require("./events/message.js")
require("./events/ready.js")
require("./events/guildMemberAdd.js")
require("./events/guildMemberRemove.js")
  
client.commands = new Collection();
client.aliases = new Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`Toplamda ${files.length} Komut Var!`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`${props.help.name} İsimli Komut Aktif!`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

if(!token){
  console.log("Botu glitch de çalıştıracaksanız .env dosyasına discord bot tokeninizi yazınız!")
} else { 
client.login(token).catch(e => {
  console.log("Tokeni doğru yazdığınızdan emin olun veya botun intentleri kapalı olabilir.")
})
}

{
const { MessageButton, MessageActionRow } = require("discord.js")
const edb = require("croxydb")
client.on("interactionCreate", async interaction => {
if (!interaction.isButton()) return;

let user = edb.get(`oylamaUSER_${interaction.message.id}_${interaction.user.id}`) 

if(interaction.customId == "evet_oylama") {
if(!user) {
edb.add(`oylamaEVET_${interaction.message.id}`, 1)

let dataEvet = edb.get(`oylamaEVET_${interaction.message.id}`) || "0"
let dataHayır = edb.get(`oylamaHAYIR_${interaction.message.id}`) || "0"

let evet = new MessageButton()
.setStyle("SUCCESS")
.setLabel(`(${dataEvet}) Evet`)
.setCustomId("evet_oylama")
let hayır = new MessageButton()
.setStyle("DANGER")
.setLabel(`(${dataHayır}) Hayır`)
.setCustomId("hayır_oylama")

interaction.message.edit({components: [new MessageActionRow({ components:  [evet, hayır] })]})

edb.set(`oylamaUSER_${interaction.message.id}_${interaction.user.id}`, interaction.user.id) 
}

interaction.deferUpdate();
}

if(interaction.customId == "hayır_oylama") {
if(!user) {
edb.add(`oylamaHAYIR_${interaction.message.id}`, 1)

let dataEvet = edb.get(`oylamaEVET_${interaction.message.id}`) || "0"
let dataHayır = edb.get(`oylamaHAYIR_${interaction.message.id}`) || "0"

let evet = new MessageButton()
.setStyle("SUCCESS")
.setLabel(`(${dataEvet}) Evet`)
.setCustomId("evet_oylama")
let hayır = new MessageButton()
.setStyle("DANGER")
.setLabel(`(${dataHayır}) Hayır`)
.setCustomId("hayır_oylama")

interaction.message.edit({ components: [new MessageActionRow({ components:  [evet, hayır] })] })

edb.set(`oylamaUSER_${interaction.message.id}_${interaction.user.id}`, interaction.user.id) 
}

interaction.deferUpdate();
}

})
}


client.on("messageCreate", async message => {
if(message.guild.id === "479553932612337684"){
if(message.channel.id === "948230697120849960"){
message.react("✅")
message.react("❌") 
}
}
})

const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(`Uptime Başarılı`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 60000);