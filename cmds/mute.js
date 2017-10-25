const Discord = require("discord.js")
const botSettings = require("../botsettings.json")
const noperm = botSettings.invalidpermissions
module.exports.run   = async (bot, message, args) => {
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.sendMessage(noperm)

            var toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
            if(!toMute) return message.channel.sendMessage("You did not specify a user!");

            var role = message.guild.roles.find(r => r.name === "Muted")
            if(!role) {
                try {
                    role = await message.guild.createRole({
                        name: "Muted",
                        color: "#000000",
                        permissions: []
                    })

                    message.guild.channels.forEach(async (channel, id) => {
                        await channel.overwritePermissions(role, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false
                        })
                    })
                } catch(e) {
                    console.log(e.stack)
                }
            }

            if(toMute.roles.has(role.id)) return message.channel.sendMessage(toMute.user.username + " is already muted!")

            await toMute.addRole(role)


            if(args.length > 1) {
                var waittime = args[1]
                if(args[1].endsWith("s")) {
                    waittime = args[1].slice(0, -1)*1000
                }
                if(args[1].endsWith("m")) {
                    waittime = args[1].slice(0, -1)*60000
                }
                if(args[1].endsWith("h")) {
                    waittime = args[1].slice(0, -1)*60*60*1000
                }
                if(args[1].endsWith("d")) {
                    waittime = args[1].slice(0, -1)*60*60*1000*24
                }
                setTimeout(function() {
                    toMute.removeRole(role);
                }, waittime);
                console.log("[Mute] " + message.author.username + " muted " + toMute.user.username + " for " + args[1])
                message.channel.sendMessage(toMute.user.username + " has been muted for " + args[1])
            } else {
                console.log("[Mute] " + message.author.username + " muted " + toMute.user.username)
                message.channel.sendMessage(toMute.user.username + " has been muted!")
            }

            return;
}
module.exports.help = {
    name: "mute"
}
