const botSettings = require("../botsettings.json")
const Discord = require("discord.js")
const noperm = botSettings.invalidpermissions
module.exports.run   = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage(noperm)
            
       var toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
       if(!toMute) return message.channel.sendMessage("You did not specify a user!");
       var role = message.guild.roles.find(r => r.name === "Muted")
       if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage(toMute.user.username + " is not muted!")
       await toMute.removeRole(role)
       message.channel.sendMessage(toMute.user.username + " has been unmuted!")
       console.log("[Mute] " + message.author.username + " unmuted " + toMute.user.username)
       return;
            
}
    module.exports.help = {
        name: "unmute"
    }