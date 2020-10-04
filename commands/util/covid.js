const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const trim = (str, max) =>
	str.length > max ? `${str.slice(0, max - 3)}...` : str;
const querystring = require('querystring');
module.exports = class Urban extends Command {
	constructor(client) {
		super(client, {
			name: 'covid',
			aliases: ['corona', 'coronavirus'],
			group: 'util',
			memberName: 'covid',
			//what the fook
			// fixed
			description:
				'Get covid statics for a specific country or the whole world.',
			ownerOnly: false,
			guarded: false,
			args: [
				{
					key: 'command',
					prompt:
						'Which country do you want the stats of? (all for the global statics)',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { command }) {
		const track = require('novelcovid');
		const args = command;
		if (args == 'all') {
			let corona = await track.all();

			let embed = new Discord.MessageEmbed()
				.setTitle('Global covid-19 cases')
				.setColor(`RANDOM`)
				.addField('Total Cases', corona.cases.toLocaleString(), true)
				.addField('Total Deaths', corona.deaths.toLocaleString(), true)
				.addField('Total Recovered', corona.recovered.toLocaleString(), true)
				.addField('Today Cases', corona.todayCases.toLocaleString(), true)
				.addField('Today Deaths', corona.todayDeaths.toLocaleString(), true)
				.addField('Active Cases', corona.active.toLocaleString(), true);

			msg.say(embed);
		} else {
			let corona = await track.countries({ country: args });

			if (corona.cases == undefined) {
				return message.channel.send(
					'Couldnt get covid stats for requested country'
				);
			}

			let embed = new Discord.MessageEmbed()
				.setTitle(`Covid-19 cases for ${corona.country}`)
				.setColor(`RANDOM`)

				.addField('Total Cases', corona.cases.toLocaleString(), true)
				.addField('Total Deaths', corona.deaths.toLocaleString(), true)
				.addField('Total Recovered', corona.recovered.toLocaleString(), true)
				.addField('Today Cases', corona.todayCases.toLocaleString(), true)
				.addField('Today Deaths', corona.todayDeaths.toLocaleString(), true)
				.addField('Active Cases', corona.active.toLocaleString(), true);

			msg.say(embed);
		}
	}
};
