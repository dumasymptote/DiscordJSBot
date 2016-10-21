var Discord = require("discord.js");
var config = require('./config.js');
var bot = new Discord.Client();
const token = process.env.BOT_TOKEN;

bot.on('ready', () => {
  console.log(`Ready to server in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});

bot.login(token);
