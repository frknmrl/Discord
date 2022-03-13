const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr")
module.exports.run = async (client, message, args) => {
  let csm = message.mentions.members.first() || message.member
  
  let csd = message.guild.members.cache.filter(mr => mr.joinedTimestamp < csm.joinedTimestamp).size + 1

  let cse = new MessageEmbed()
    .setTitle("📋" + "`" + csm.user.tag + "`" + " adlı kullanıcının bilgileri")
    .setThumbnail(csm.user.avatarURL())
    .setColor("BLACK")
    .addField("🎫 __Kullanıcının Sayısal Kimliği__", "> " + csm.user.id, true)
    //.addField("👥 __Kullanıcı Adı__", "> " + csm.user.username)
    .addField("📆 __Hesabın Oluşturulma Tarihi__", "> " + moment(csm.user.createdTimestamp).format('LLLL'), true)
    .addField("📆 __Sunucuya Katılma Tarihi__", "> " + moment(csm.joinedTimestamp).format('LLLL'), true)
    .addField("💎 __Sahip Olduğu Roller__", "> " + `${csm.roles.cache.map(cs => cs).join(", ")}`, true)
    .setFooter({text: "Eien | Kullanıcı Sorgulama Sistemi" })
    .setTimestamp()
  message.channel.send({embeds: [cse]}).catch(e => {})

}
module.exports.conf = {
  aliases: ["ui", "profil"]
}

module.exports.help = {
  name: "user-info"
}