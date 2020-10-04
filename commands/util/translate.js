const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const trim = (str, max) =>
	str.length > max ? `${str.slice(0, max - 3)}...` : str;
const querystring = require('querystring');
module.exports = class Translate extends Command {
	constructor(client) {
		super(client, {
			name: 'translate',
			aliases: ['trans'],
			group: 'util',
			memberName: 'translate',
			//what the fook
			// fixed
			description: 'Translate stuff.',
			ownerOnly: false,
			guarded: false,
			args: [
				{
					key: 'command',
					prompt: 'What do you want me to translate?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { command }) {
		const translate = require('@vitalets/google-translate-api');
		const input = command;

		translate(input, { to: 'en' })
			.then(res => {
				let embed = new Discord.MessageEmbed();
				embed.setTitle('Translation');
				embed.setColor(`RANDOM`);
				embed.addField('Text', input, true);
				embed.addField('Translation', res.text, true);
				embed.setFooter(
					'Translated from ' + res.from.language.iso.toUpperCase()
				);
				msg.say(embed);
			})
			.catch(err => {
				msg.say('Unable to translate given text');
			});
	}
};
