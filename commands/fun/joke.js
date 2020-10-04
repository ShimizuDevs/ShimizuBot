const { Command } = require('discord.js-commando');
const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const Discord = require('discord.js');
module.exports = class Dog extends Command {
	constructor(client) {
		super(client, {
			name: 'joke',
			aliases: ['dadjoke'],
			memberName: 'joke',
			group: 'fun',
			description: 'Gets a random joke.'
		});
	}

	async run(msg) {
		const { attachments } = await fetch(
			`https://icanhazdadjoke.com/slack`
		).then(response => response.json());
		const [joke] = attachments;

		let embed = new Discord.MessageEmbed()
			.setTitle(`Here's your joke ${msg.author.username}`)
			.setDescription(`**${joke.fallback}**`)
			.setColor(`RANDOM`)
			.setFooter(
				`Requested by ${msg.author.username}`,
				msg.author.displayAvatarURL()
			)
			.setTimestamp();
		msg.say(embed);
	}
};
