const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const trim = (str, max) =>
	str.length > max ? `${str.slice(0, max - 3)}...` : str;
const querystring = require('querystring');
module.exports = class Urban extends Command {
	constructor(client) {
		super(client, {
			name: 'wiki',
			aliases: ['wikipedia'],
			group: 'util',
			memberName: 'wikipedia',
			//what the fook
			// fixed
			description: 'Get information on a thing from wikipedia.',
			ownerOnly: false,
			guarded: false,
			args: [
				{
					key: 'command',
					prompt: 'Which word do you want me to search on wikipedia?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { command }) {
		const wiki = require('wikijs').default();
		const query = command;
		const search = await wiki.search(query, 1);
		if (search.results[0] == undefined) {
			return msg.say('Couldnt find wiki for given query');
		}
		// why util category
		//cuz its utility duh
		// hm
		const result = await wiki.page(search.results[0]);
		if (query == '') {
			return msg.say('What do you want me to search on wikipedia');
		} else if (!search.results.length) {
			return msg.say('Couldnt find requested query on wikipedia');
		}

		let description = await result.summary();
		if (description.length < 150) {
			description = description;
		} else {
			description = `${description.substring(0, 1950)}...\nClick [**here**](${
				result.raw.fullurl
			}) to read more!`;
		}

		let embed = new Discord.MessageEmbed();
		embed.setDescription(description);
		embed.setAuthor(`Wiki for ${query}`);
		embed.setTitle(
			result.raw.fullurl
				.replace('https://en.wikipedia.org/wiki/', '')
				.replace(/_/gi, ' ')
		);
		embed.setURL(result.raw.fullurl);
		embed.setFooter(
			`Requested by ${msg.author.username}`,
			msg.author.displayAvatarURL()
		);
		embed.setTimestamp();
		embed.setColor(`RANDOM`);

		msg.say(embed);
	}
};
