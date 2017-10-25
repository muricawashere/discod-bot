
const Discord = require("discord.js")
module.exports.run   = async (bot, message, args) => {
    var userinfotarget = message.mentions.users.first()
    if(!userinfotarget) {
        var embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.username}#${message.author.discriminator}`)
        .setDescription("This is the user's info!")
        .setColor("#ff0000")
        .setThumbnail(message.author.avatarURL)
        .addField("Created At", message.author.createdAt)
        .addField("ID", message.author.id)
    message.channel.sendEmbed(embed);
    } else {
        var embed = new Discord.RichEmbed()
        .setAuthor(`${userinfotarget.username}#${userinfotarget.discriminator}`)
        .setDescription("This is the user's info!")
        .setColor("#000000")
        .setThumbnail(userinfotarget.avatarURL)
        .addField("Created At", userinfotarget.createdAt)
        .addField("ID", userinfotarget.id)
    message.channel.sendEmbed(embed);
    }
}
module.exports.help = {
    name: "userinfo"
}