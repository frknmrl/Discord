module.exports = {
	name: "guildMemberRemove",
	async execute(member) {
		member.guild.channels.cache.get("884461376909766706").send(`${member.user} has left the server!`);
	}
}