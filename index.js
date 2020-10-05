const { TOKEN, PREFIX } = process.env;
const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const http = require('http');

const client = new CommandoClient({
	commandPrefix: PREFIX,
	owner: '743767109817073664',
	invite: 'https://discord.gg/tmHrHC2'
});

const server = http.createServer((req, res) => {
	res.writeHead(200);
	res.end('gnomed');
});

server.listen(3000);

client.registry
	.registerDefaultTypes()
	.registerGroups([['fun', 'Fun'], ['util', 'Utility'], ['info', 'Information']])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.login(TOKEN);
