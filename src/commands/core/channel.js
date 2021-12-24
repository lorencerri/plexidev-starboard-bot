const { Command, RegisterBehavior } = require('@sapphire/framework');
const { ChannelType } = require('discord-api-types/v9');
const {
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder
} = require('@discordjs/builders');
ChannelType;
const db = require('quick.db');

module.exports = class extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'channel',
            description:
                'Set or remove the channel for the bot to use as a starboard feed',
            preconditions: ['AdminOnly']
        });
    }

    async chatInputRun(interaction) {
        const { guild, options } = interaction;

        const subcommand = options.getSubcommand(true);
        const channel = options.getChannel('channel');

        if (subcommand === 'clear') {
            db.set(`starboard_channel_${guild.id}`, null);
            interaction.reply('Successfully cleared the starboard channel.');
        } else {
            db.set(`starboard_channel_${guild.id}`, channel.id);
            interaction.reply(
                `Successfully set the starboard channel to ${channel.toString()}`
            );
        }
    }

    registerApplicationCommands(registry) {
        const setSubcommand = new SlashCommandSubcommandBuilder()
            .setName('set')
            .setDescription('Set the channel for the bot to use a starboard')
            .addChannelOption(channel =>
                channel
                    .setName('channel')
                    .setDescription('The channel to be used')
                    .addChannelType(ChannelType.GuildText)
                    .setRequired(true)
            );

        const clearSubcommand = new SlashCommandSubcommandBuilder()
            .setName('clear')
            .setDescription(
                'Clears the channel for the bot to use as a starboard feed'
            );

        const command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addSubcommand(setSubcommand)
            .addSubcommand(clearSubcommand);

        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [process.env.GUILD_ID]
        });
    }
};
