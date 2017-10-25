const botSettings = require("./botsettings.json")
const Discord = require("discord.js")
const prefix = botSettings.prefix
var playing = ""
const bot = new Discord.Client({disableEveryone: true})

bot.on("ready", async() => {
    console.log(`Bot is ready! ${bot.user.username}`)
    bot.user.setGame(playing)
    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"])
        console.log(link)
    } catch(e) {
        console.log(e.stack)
    }
})

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    var messageArray = message.content.split(" ")
    var command = messageArray.shift()
    var args = messageArray //.slice(1)

    if(!command.startsWith(prefix)) return;
    if(command === `${prefix}setgame`) {
        var playing = messageArray.join(" ")
        bot.user.setGame(playing)
    }
    if(command === `${prefix}userinfo`) {
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
    if(command ===`${prefix}mute`) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have permissions!")

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
        message.channel.sendMessage(toMute.user.username + " has been muted!")
        console.log("[Mute] " + message.author.username + " muted " + toMute.user.username)
        return;
    }
    if(command ===`${prefix}unmute`) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have permissions!")

        var toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
        if(!toMute) return message.channel.sendMessage("You did not specify a user!");

        var role = message.guild.roles.find(r => r.name === "Muted")
        if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage(toMute.user.username + " is not muted!")

        await toMute.removeRole(role)
        message.channel.sendMessage(toMute.user.username + " has been unmuted!")
        console.log("[Mute] " + message.author.username + " unmuted " + toMute.user.username)
        return;
    }
})

bot.login(botSettings.token);