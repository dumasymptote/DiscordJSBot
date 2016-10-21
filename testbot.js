var Discord = require("discord.js");
var config = require('./config.js');
var pg = require('pg');
var bot = new Discord.Client();
const token = process.env.BOT_TOKEN;
const cmdPrefix = process.env.COMMANDPREFIX;
var config = {
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
};
var commands = {};
var sqlclient = new pg.Client(config);
sqlclient.on('drain', sqlclient.end.bind(sqlclient));
sqlclient.connect();
var query = sqlclient.query("select command, response from commands");
query.on('row', function(row, result) {
      commands[row.command] = row.response;
      result.addRow(row);
    });
query.on('end', function(result) {
      //fired once and only once, after the last row has been returned and after all 'row' events are emitted
      //in this example, the 'rows' array now contains an ordered set of all the rows which we received from postgres
      console.log(commands);
    });

bot.on('ready', () => {
  console.log(`Ready to server in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});

bot.on("message", msg=> {
  //this will exit the method if the message doesnt have a command or is a bot user.
  if(!msg.content.startsWith(cmdPrefix) || msg.author.bot)
    return;
  let args = msg.content.split(" ");
  let cmd = args[0].slice(1);
  console.log("Debug: " + cmd);
  if(commands[cmd])
  {
    console.log("Debug: " + cmd);
    msg.channel.sendMessage(commands[cmd]);
  }
});

bot.login(token);
