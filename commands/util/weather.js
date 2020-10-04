const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const trim = (str, max) =>
	str.length > max ? `${str.slice(0, max - 3)}...` : str;
const querystring = require('querystring');
module.exports = class Translate extends Command {
	constructor(client) {
		super(client, {
			name: 'weather',
			aliases: null,
			group: 'util',
			memberName: 'weather',
			//what the fook
			// fixed
			description: 'Get the weather for a specific location.',
			ownerOnly: false,
			guarded: false,
			args: [
				{
					key: 'command',
					prompt: 'Which place do you want the weather of?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { command }) {
		let weather = require('weather-js');
		let args = command;
		var message = msg;
		weather.find({ search: args, degreeType: 'C' }, function(err, result) {
			try {
				let embed = new Discord.MessageEmbed()
					.setTitle(`Weather in ${result[0].location.name}`)
					.setColor(`RANDOM`)

					.addField(
						'Temperature',
						`${result[0].current.temperature} celcius`,
						true
					)
					.addField('Sky Text', result[0].current.skytext, true)
					.addField('Humidity', result[0].current.humidity, true)
					.addField('Wind Speed', result[0].current.windspeed, true)
					.addField('Observation Time', result[0].current.observationtime, true)
					.addField('Wind Display', result[0].current.winddisplay, true)
					.setThumbnail(result[0].current.imageUrl);
				message.say(embed);
			} catch (err) {
				return message.say(`lol wot`);
			}
		});
	}
};
