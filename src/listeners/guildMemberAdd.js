const { Listener } = require('@sapphire/framework');

module.exports = class extends Listener {
    async run(member) {
        const { user } = member;
        const { username } = user;

        const phrases = ['clonex'];

        if (phrases.some(phrase => username.toLowerCase().includes(phrase))) {
            member.ban({
                reason: 'Your name includes a possibly malicious phrase.'
            });
        }
    }
};
