const { Command } = require('discord.js-commando');
const { MessageEmbed, version: djsversion } = require('discord.js');
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');

function formatBytes(bytes) {
	if (bytes === 0) return '0 Bytes';
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}

module.exports = class BotInfo extends Command {
	constructor(client) {
		super(client, {
			name: 'botinfo',
			memberName: 'botinfo',
			group: 'info',
			description: 'Gives you detailed information about the bot.'
		})
	}

	run(msg) {
		const core = os.cpus()[0];
		const embed = new MessageEmbed()
			.setThumbnail(this.client.user.displayAvatarURL())
			.setColor('RANDOM')
			.addField('General', [
				`**Client:** ${this.client.user.tag} (${this.client.user.id})`,
				`**Commands:** ${this.client.registry.commands.size.toLocaleString()} commands`,
				`**Servers:** ${this.client.guilds.cache.size.toLocaleString()} servers`,
				`**Users:** ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users`,
				`**Channels:** ${this.client.channels.cache.size.toLocaleString()} channels`,
				`**Creation Date:** ${utc(this.client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
				`**Node.js:** ${process.version}`,
				`**Version:** v1.0.0-rewrite`,
				`**Discord.js:** v${djsversion}`,
				'\u200b'
			])
			.addField('System', [
				`**Platform:** ${process.platform}`,
				`**Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
				`**CPU:**`,
				`\u3000 Cores: ${os.cpus().length}`,
				`\u3000 Model: ${core.model}`,
				`\u3000 Speed: ${core.speed}MHz`,
				`**Memory:**`,
				`\u3000 Total: ${formatBytes(process.memoryUsage().heapTotal)}`,
				`\u3000 Used: ${formatBytes(process.memoryUsage().heapUsed)}`
			])
			.setTimestamp();

		msg.say(embed);
	}
};
