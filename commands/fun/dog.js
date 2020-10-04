const { Command } = require('discord.js-commando');
const { MessageAttachment } = require('discord.js');
const request = require('node-superfetch');

module.exports = class Dog extends Command {
	constructor(client) {
		super(client, {
			name: 'dog',
			memberName: 'dog',
			group: 'fun',
			description: 'Gets a random dog image.'
		});
	}
	
	async run(msg) {
		const { body } = await request.get('https://api.alexflipnote.dev/dogs');
		        
		msg.say(new MessageAttachment(body.file));
	}
};