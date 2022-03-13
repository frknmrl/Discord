const Discord = require('discord.js');

exports.run = async(client, message, args) => {
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply({content: "**Yetersiz yetki! gereken => mesajları sil**" }).catch(e => {})

  const sayi = args[0]

  if (!sayi) {
    return message.reply({content: "En az `1 - 100` arasında bir tam sayı değeri girmelisiniz." }).catch(e => {})
  }

  if(isNaN(sayi)) return message.reply({content: "Bir Ssayı değeri girmelisiniz." }).catch(e => {})
  if (sayi > 101) return message.reply({content: "En az `1 - 100` arasında bir tam sayı değeri girmelisiniz." }).catch(e => {})


  await message.channel.messages.fetch({limit: sayi}).then(messages => {
    message.channel.bulkDelete(messages).catch(e => {})
});
  
setTimeout(() => {
    message.channel.send({content: `<@${message.author.id}> ${sayi} adet mesaj başarıyla uzaya fırlatıldı. :rocket:`}).then(cs => {
      setTimeout(() => {
      cs.delete().catch(e => {})
      }, 5000)
    }).catch(e => {})
  }, 2000)
};

exports.conf = {
  aliases: ["sil"]
};

exports.help = {
  name: 'temizle'
};