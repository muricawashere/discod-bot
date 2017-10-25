const Discord = require("discord.js")
const botSettings = require("../botsettings.json")
const noperm = botSettings.invalidpermissions
module.exports.run   = async (bot, message, args) => {
        var messageArray = message.content.split(" ")
        var command = messageArray.shift()
        var args = messageArray //.slice(1)
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendMessage(noperm)
        var playing = messageArray.join(" ")
        bot.user.setGame(playing)
    }
module.exports.help = {
    name: "setgame"
}