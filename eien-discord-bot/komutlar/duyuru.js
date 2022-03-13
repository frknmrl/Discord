const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply({ content: "**YETERSİZ YETKİ!**" });
  let csc = message.mentions.channels.first();
  if (!csc) return message.reply({content: "**Duyuru yapılacak kanalı etiketlemen gerekiyor.**" });
  let csm = args.slice(1).join(" ");
  if (!csm) return message.reply({ content: "**Duyuru yapılacak metni yazman gerekiyor.**" });

  let cse = new Discord.MessageEmbed()
    .setTitle("🔔 Yeni bir duyuru var!")
    .setColor("WHITE")
    .setDescription(`${csm}`)
    .setTimestamp()
    .setFooter({ text: "Hey! Yeni bir duyuru var!" });
  csc.send({embeds : [cse]});
  setTimeout(() => {
    csc.send({ content: "@everyone" }).then(csmm => {
      csmm.delete();
    });
  }, 2000);
};
module.exports.conf = {
  aliases: []
};

module.exports.help = {
  name: "duyuru"
};