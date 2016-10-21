var Discord = require("discord.js");
var config = require('./config.js');
var bot = new Discord.Client();
const token = process.env.BOT_TOKEN;
const cmdPrefix = "-";

bot.on('ready', () => {
  console.log(`Ready to server in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});

bot.on("message", msg=> {
  //this will exit the method if the message doesnt have a command or is a bot user.
  if(!msg.content.startsWith(cmdPrefix) || msg.author.bot)
    return;
});


bot.login(token);
