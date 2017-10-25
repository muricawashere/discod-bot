const botSettings = require("../botsettings.json")
const noperm = botSettings.invalidpermissions
const Discord = require("discord.js")
var warnings = {}
module.exports.run   = async (bot, message, args) => {
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage(noperm)
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage(noperm)
    var toWarn = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!toWarn) return message.channel.sendMessage("You did not specify a user!")
    var warnmessage = ""
    if(!warnings[toWarn]) {
        warnings[toWarn] = 1
    } else {
        warnings[toWarn] += 1
        console.log(warnings)
    }
    toWarn.sendMessage({embed: {
        color: 16729344,
        title: "Server: " + message.guild.name,
        BlankField: true,
        author: {
            name: "Warning " + warnings[toWarn] + "/3",
            icon_url: message.guild.iconURL,
        },
        fields: [{
            name: "What Does This Mean?",
            value: "Pretty much just doesnt do what youve been doing. If you get 3 more warns you will be banned"
        }],
        timestamp: new Date(),
        footer: {
            icon_url: message.author.avatarURL,
            text: "Issued by " + message.author.username,
        }
    }})
    if(warnings[toWarn] >= 3) {
        message.guild.ban(toWarn)
        //message
    }
}
module.exports.help = {
    name: "warn"
}