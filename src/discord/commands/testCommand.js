const { client } = require('../config/initialize');

const testCommand = () => {
    let command = 'asd asd off-campus -test [embed]';
    let testChannelID = '596645734737248256';

    let channel = client.channels.get(testChannelID);
    return channel.send(command);
}

module.exports = testCommand;