const { messageReactionTimer } = require('../data/settings');
const { clearSpamPrevent } = require('../reactions/reactionGen');

let messageState = {};

const messageStateStore = (botMessage, lboxdRes) => {
    messageState = {
        ...messageState,
        [botMessage.id]: {
            ...lboxdRes
        }
    }
    console.log(messageState);
    clearStoreEntry(botMessage.id);
};

const clearStoreEntry = (id) => {
    setTimeout(() => {
          const { [id]: deletedId, ...noId } = messageState;
          messageState = noId;

    }, messageReactionTimer);
};

const getMessageState = () => {
    return messageState;
}


module.exports = { messageStateStore, getMessageState };