const { Command } = require('discord.js-commando');
const { MessageAttachment } = require('discord.js');
const randomanime = require('random-anime');

module.exports = class RandomAnime extends Command {
	constructor(client) {
		super(client, {
			name: 'anime',
			aliases: ['ranime'],
			memberName: 'anime',
			group: 'fun',
			description: 'Provides you a random anime image.'
		});
	}

	run(msg) {
		const image = randomanime.anime();
		msg.say(new MessageAttachment(image));
	}
};
