const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const trim = (str, max) =>
	str.length > max ? `${str.slice(0, max - 3)}...` : str;
const querystring = require('querystring');
module.exports = class Translate extends Command {
	constructor(client) {
		super(client, {
			name: 'calculate',
			aliases: ['calc', 'math'],
			group: 'util',
			memberName: 'calculate',
			//what the fook
			// fixed
			description: 'Calculate stuff.',
			ownerOnly: false,
			guarded: false,
			args: [
				{
					key: 'command',
					prompt: 'What math problem do you want me to solve?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { command }) {
		const args = command;
		const message = msg;
		let embed = new Discord.MessageEmbed();
		function replace(text, thing, stuff) {
			return text.split(thing).join(stuff);
		}
		const query = replace(args.toString(), '+', '%2B');
		const answer = await fetch(`http://api.mathjs.org/v4/?expr=${query}`).then(
			response => response.text()
		);

		if (answer.length == 0) {
			return message.channel.send('Please give a proper calculation');
		} else if (answer.includes('Error') == true || answer == undefined || isNaN(answer) == true) {
			return message.say(
				'Provide a proper calculation, make sure you dont separate items by a space\n\nThe operators are:\nAddition = +\nSubstraction = -\nMultiplication = *\nDivision = /'
			);
		}
		embed.setTitle('Calculation');
		embed.addField('Question', args, true);
		embed.addField('Answer', answer, true);
		embed.setColor(`RANDOM`);
		embed.setFooter(
			`Requested by ${message.author.username}`,
			message.author.displayAvatarURL()
		);
		embed.setTimestamp();
		message.say(embed);
		// u also could replace msg with message
		//ik
	}
};
