const {MessageEmbed} = require('discord.js')
var steam = require('steam-provider')
var provider = new steam.SteamProvider();

exports.run = async(client, message, args) => {
    let game = args.slice(0).join(" ");
    let steampng = "https://cdn.discordapp.com/attachments/458004691402489856/470344660364034049/steam.png";
    if(!game) return message.reply({content: "Geçerli bir oyun adı girin!"})
    provider.search(game).then(result => {
        provider.detail(result[0].id, "turkey", "tr").then(results => {
            const embed = new MessageEmbed()
            .setAuthor('📋 Oyun Dostum | Steam Mağaza', steampng)
            .setColor("BLACK")
            .setTitle(result[0].name)
            .addField(`🎫 __Oyunun ID'si__`, result[0].id)
            .setThumbnail(results.otherData.imageUrl)
            .addField('🎮 __Türleri__', `${results.genres}`)
            .addField('💳 __Fiyatı__', `💰 Normal Fiyat **${results.priceData.initialPrice}**₺ \n💸 İndirimli Fiyat **${results.priceData.finalPrice}**₺`, true)
            .addField('💻 __Platformlar__', `${results.otherData.platforms}`, true)
            .addField('🔖 __Etiketleri__', `${results.otherData.features}`)
            .addField('♨  __Geliştiricileri__', `${results.otherData.developer}`, true)
            .addField('📡 __Yayımcıları__', `${results.otherData.publisher}`, true)
            .setColor("BLACK")
        message.channel.send({embeds: [embed]}).catch(e => {
            console.log(e)
            message.reply('Hata oluştu veya `' + game + '` adlı oyun bulunamadı')
        })
    })
})
}
exports.conf = {
    aliases: [],
},
exports.help = {
    name: "steam"
}