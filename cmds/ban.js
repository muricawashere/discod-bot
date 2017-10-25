const Discord = require("discord.js")
const botSettings = require("../botsettings.json")
const bantime = botSettings.bantime
const bot = new Discord.Client({disableEveryone: true})
module.exports.run   = async (bot, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Invalid Permissions!");
    var toBan = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!toBan) return message.channel.sendMessage("You did not specify a user!");

    message.guild.ban(toBan)

    setTimeout(function() {
        message.guild.unban(toBan)
        toBan.sendMessage("You have been unbanned ")
    }, bantime);
}
module.exports.help = {
    name: "ban"
}