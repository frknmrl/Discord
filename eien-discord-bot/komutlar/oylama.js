const { MessageButton, MessageEmbed, MessageActionRow } = require("discord.js")

module.exports.run= async(client, message, args) => {

let mesaj =  args.slice(0) .join(" ")
if(!mesaj) return message.reply("?")

let evet = new MessageButton()
.setStyle("SUCCESS")
.setLabel("(0) Evet")
.setCustomId("evet_oylama")
let hayır = new MessageButton()
.setStyle("DANGER")
.setLabel("(0) Hayır")
.setCustomId("hayır_oylama")

let expert = new MessageEmbed()
.setTitle("(❔) Oylama Sistemi")
.setDescription("> "+ mesaj)
.setColor("WHITE")

message.channel.send({embeds: [expert], components: [new MessageActionRow({ components:  [evet, hayır] })] })

}
module.exports.conf = {
aliases: []
}
module.exports.help = {
name: "oylama"
}