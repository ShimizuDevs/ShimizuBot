const { Command } = require('discord.js-commando');
const { MessageAttachment } = require('discord.js');
const request = require('node-superfetch');

module.exports = class Cat extends Command {
	constructor(client) {
		super(client, {
			name: 'cat',
			memberName: 'cat',
			group: 'fun',
			description: 'Gets a random cat image.'
		});
	}
	
	async run(msg) {
		const { body } = await request.get('https://api.alexflipnote.dev/cats');
		        
		msg.say(new MessageAttachment(body.file));
	}
};