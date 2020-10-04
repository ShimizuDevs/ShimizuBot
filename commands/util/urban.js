const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const trim = (str, max) =>
	str.length > max ? `${str.slice(0, max - 3)}...` : str;
const querystring = require('querystring');
module.exports = class Urban extends Command {
	constructor(client) {
		super(client, {
			name: 'urban',
			aliases: ['urban-dictionary', 'urbandictionary'],
			group: 'util',
			memberName: 'urban',
			//what the fook
			// fixed
			description: 'Get definitions for specific words from urban dictionary.',
			ownerOnly: false,
			guarded: false,
			args: [
				{
					key: 'command',
					prompt: 'Which word do you want to search',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { command }) {
		const query = querystring.stringify({ term: command });

		const { list } = await fetch(
			`https://api.urbandictionary.com/v0/define?${query}`
		).then(response => response.json());

		if (!list.length) {
			return msg.say(`No results found for **${command}**.`);
		}

		const [answer] = list;

		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addFields(
				{ name: 'Definition', value: trim(answer.definition, 1024) },
				{ name: 'Example', value: answer.example },
				{
					name: 'Rating',
					value: `${answer.thumbs_up} 👍 ${answer.thumbs_down} 👎`
				}
			);
		msg.say(embed);
	}
};
