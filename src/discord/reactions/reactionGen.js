const embedGen = require('../embedGen');
const { getMessageState } = require('../data/messageStateStore');

const reactionGen = (botMessage) => {
    botMessage.react('🇦');
    botMessage.react('🇧');
    reactionCollector(botMessage);
}

module.exports = reactionGen;

const reactionCollector = async (botMessage) => {
    try {
        const collector = botMessage.createReactionCollector(filter, { time: 5 * 60 * 1000 });

        collector.on('collect', async (reaction, reactionCollector) => {
            reaction.users
                .filter(user => user.id !== "595832135856685056")
                .tap(user => reaction.remove(user));

            switch (reaction.emoji.name) {
                case "🇦":
                    const editedEmbed = await embedGen({ type: "TEST2" }, { details: getMessageState()[botMessage.id] });
                    botMessage.edit(editedEmbed);
                    return;
                case "🇧":
                    return;
                default:
                    return console.log("reaction passed through filter but failed in switch")
            }

        });
    }
    catch (e) {
        console.log(e);
    }
};

const filter = (reaction, user) => {
    reaction.users
        .filter(user => user.id !== "595832135856685056")
        .tap(user => reaction.remove(user));

    return user.id !== "595832135856685056"
        && spamPrevent(user)
        && (reaction.emoji.name === '🇦' || reaction.emoji.name === '🇧');
};

let spamPreventState = {};

const spamPrevent = (user) => {
    const returnValue = !spamPreventState[user.id] ? true : false;
    spamPreventState = {
        ...spamPreventState,
        [user.id]: true
    }
    // const spamLockoutTimer = {
    //     1: 3000,
    //     2: 15000,
    //     3: 60 * 60 * 1000,
    //     4: 24 * 60 * 60 * 1000,
    //     5: 1000 * 1000 * 1000 * 1000
    // }[spamPreventState[user.id].level] || 1000 * 1000 * 1000 * 1000;

    setTimeout(() => {
        const { [user.id]: deletedUserId, ...noDeletedUserId } = spamPreventState;
        spamPreventState = noDeletedUserId;
    }, 3000);

    return returnValue;
}