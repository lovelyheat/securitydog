const { Command } = require('@sapphire/framework');
const { EmbedBuilder } = require('discord.js');
const { Timestamp } = require('@sapphire/time-utilities');

class UserCommand extends Command {
	/**
	 * @param {Command.LoaderContext} context
	 */
	constructor(context) {
		super(context, {
			aliases: ['ui', 'whois', 'who'],
			cooldownDelay: 500,
			description: "General data about a discord user",
			typing: true
		});
	}

	async messageRun(message, args) {
		let member = await args.pick("member").catch(() => message.member);

		let rolesString = member.roles.cache.filter((r) => r.name !== "@everyone").map((r) => r).join(", ");
		if (rolesString.length > 1024) rolesString = rolesString.substring(0, 1020) + "...";
	  
		const time = new Timestamp("LLLL");
		
		const UserEmbed = new EmbedBuilder()
		  .setAuthor({
			name: `${member.user.username}`,
			iconURL: member.user.displayAvatarURL(),
		  })
		  .setDescription(`${member}`)
		  .setThumbnail(member.user.displayAvatarURL())
		  .setColor("#FFDFD3")
		  .addFields(

			{
			  name: "Guild Joined",
			  value: time.display(member.joinedAt),
			  inline: true
			},
			{
			  name: "Discord Registered",
			  value: time.display(member.user.createdAt),
			  inline: true
			},
			{
				name: `Roles [${member.roles.cache.filter(r => r.name !== "@everyone").size}]`,
				value: rolesString,
			},
			{
				name: "  ",
				value: `[\`Avatar URL\`](${member.user.displayAvatarURL({ size: 2048 })}) | [\`Discord Profile Link\`](https://discord.com/users/${member.user.id})`
			}
		  )
		  .setFooter({ text: `ID: ${member.user.id}`})
		  .setTimestamp();

		return message.channel.send({
			embeds: [UserEmbed]
		});
	}
}

module.exports = {
	UserCommand
};
