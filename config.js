const dotenv = require('dotenv');
const fs = require('fs');
try
{
  if (fs.statSync('.env'))
    {
    dotenv.load();
  }
}
catch (e)
{
    // Swallow exceptions due to no .env file
}

const defaults = {
    "BOT_TOKEN" : "" ,
}
for (const key in defaults)
{
  process.env[key] = (key in process.env) ? process.env[key] : defaults[key];
}
module.exports = process.env;