const { Precondition } = require('@sapphire/framework');

class AdminOnlyPrecondition extends Precondition {
    chatInputRun(interaction) {
        const { member } = interaction;
        if (member.permissions.has('ADMINISTRATOR')) return this.ok();
        else {
            interaction.reply('This command requires administrator!');
            return this.error('Only administrators can run this command!');
        }
    }
}

module.exports = {
    AdminOnlyPrecondition
};
