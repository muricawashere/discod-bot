const botSettings = require("./botsettings.json")
const Discord = require("discord.js")
const prefix = botSettings.prefix
const votemutetime = botSettings.votemutetime
const bot = new Discord.Client({disableEveryone: true})
var votes = {}
const fs = require("fs")
const name = ['jaydens', 'addys', 'spencers', 'gavins', 'rivers', 'maxs']
bot.commands = new Discord.Collection()

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err)

    jsfiles = files.filter(f => f.split(".").pop() === "js")
    if(jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`)

    jsfiles.forEach((f, i) => {
        props = require(`./cmds/${f}`)
        console.log(`${i + 1}: ${f} loaded!`)
        bot.commands.set(props.help.name, props)
    })
})
bot.on("ready", async() => {
    console.log(`Bot is ready! ${bot.user.username}`)
    var rperson = Math.floor(Math.random() * (5 - 0) + 0)
    console.log(rperson)
    bot.user.setGame("with " + name[rperson] + " ")
})
bot.on("messageReactionAdd", (reaction, user) => {
    if(!user.bot && reaction._emoji.name === '🍆') {
        if(reaction.count > 3) {
            console.log(reaction.content)
            bot.channels.get('372191976658829312').sendMessage({embed: {
                color: 3447003,
                author: {
                    name: reaction.message.author.username,
                    icon_url: reaction.message.author.avatarURL,
                },
                description: reaction.message.content,
            }})
    }
}})
bot.login(botSettings.token);
