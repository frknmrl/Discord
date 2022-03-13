const { Permissions } = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
    return message
      .reply({ content: "> :x: **Başarısız!** Ban atma yetkin yok dostum.", allowedMentions: { repliedUser: false } })
      .catch((err) => {});
  if (!message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
    return message
      .reply({ content: "> :x: **Başarısız!** Benim ban atma yetkim yok.", allowedMentions: { repliedUser: false } })
      .catch((err) => {});

  let sebep = args.slice(1).join(" ") || "Belirtilmemiş";

  let member;
  let member1 = message.mentions.members.first();
  let member2 = message.guild.members.cache.get(args[0]);
  if (member1) {
    member = member1.id;
  }
  if (member2) {
    member = member2.id;
  }
  if (!member1 && !member2) {
    member = args[0];
  }

  if (!member)
    return message
      .reply({
        content: "> :x: **Başarısız!** Kullanıcı belirtmelisin..",
        allowedMentions: { repliedUser: false },
      })
      .catch((err) => {});

  let kullanıcı = message.guild.members.cache.get(member);

  if (kullanıcı) {

    if (message.guild.ownerId === member)
      return message
        .reply({
          content: "> :x: **Başarısız!** Sunucu sahibini banlamak mı? Bu beni aşar dostum.",
          allowedMentions: { repliedUser: false },
        })
        .catch((err) => {});
    if (message.author.id === member)
      return message
        .reply({
          content: "> :x: **Başarısız!** Dostum kendini banlamak yerine sunucudan çıksan daha iyi olur beni de yormamış olursun 🥱",
          allowedMentions: { repliedUser: false },
        })
        .catch((err) => {});
    if (client.user.id === member)
      return message
        .reply({
          content: "> :x: **Başarısız!** Beni mi banlayacaksın :(",
          allowedMentions: { repliedUser: false },
        })
        .catch((err) => {});

    if (message.guild.ownerId !== message.author.id) {
      if (kullanıcı.roles.highest.position >= message.member.roles.highest.position)
        return message
          .reply({
            content: "> :x: **Başarısız!** Bu kullanıcının rolü senden yüksek, dikkat etmelisin 🤭",
            allowedMentions: { repliedUser: false },
          })
          .catch((err) => {});
    }

    if (kullanıcı.roles.highest.position >= message.guild.me.roles.highest.position)
      return message
        .reply({
          content: "> :x: **Başarısız!** Kullanıcının rolü benim rolümden yüksek.",
          allowedMentions: { repliedUser: false },
        })
        .catch((err) => {});
  }

  message.guild.members
    .ban(member, {
      days: 7,
      reason: `By: ${message.author.tag} Reason: ` + sebep || "Belirtilmemiş",
    })
    .then(() => {
      message.reply({
        content: `> ✅ **Başarılı!** Kullanıcı başarıyla sunucudan banlandı!`,
        allowedMentions: { repliedUser: false },
      });
    })
    .catch((e) => {
      message
        .reply({
          content: `> :x: **Başarısız!** Kullanıcıyı sunucudan yasklarken hata aldım. \n**Hata:** \`\`\`${e.name + ": " + e.message}\`\`\``,
        })
        .catch((err) => {});
    });

};
module.exports.conf = {
  aliases: []
};

module.exports.help = {
  name: "ban"
}; 