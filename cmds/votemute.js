
const Discord = require("discord.js")
module.exports.run   = async (bot, message, args) => {
    votesneeded = Math.ceil(message.member.voiceChannel.members.size/2)
    console.log(message.member.voiceChannel.members.size)
    console.log(message.mentions.users.username)
    toVoteMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!toVoteMute) return message.channel.sendMessage("Please specify a user!")
    message.channel.sendMessage({embed: {
        color: 16729344,
        title: "Vote Mute: " + toVoteMute.user.username + " | Votes: 0/" + votesneeded
        
    }})
    .then(function (message) {
        message.react("⬆")
    }).catch(function() {
        //Something
    })
    
}
module.exports.help = {
    name: "votemute"
}