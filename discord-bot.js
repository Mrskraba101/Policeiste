const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

client.on('guildMemberAdd', member => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  if (!data.users.find(u => u.username === member.user.username)) {
    data.users.push({
      username: member.user.username,
      displayname: member.displayName,
      joinTime: new Date().toISOString(),
      cards: [],
      age: 'ei tietoa'
    });
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  }
});

client.login('BOT_TOKEN');
