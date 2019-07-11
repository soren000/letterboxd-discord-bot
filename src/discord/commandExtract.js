const { client, prefix } = require('./config/initialize');
const commands = require('./data/commandsArray')();
console.log(commands);

module.exports = async (message) => {
    const messageArray = message.content
        .split(' ')
        .filter(item => item !== "");
    const commandIndex = messageArray.findIndex(word => word.startsWith(prefix));
    const commandItem = commandIndex > -1 && messageArray[commandIndex];
    const containsCommand = commandItem && commands.some(command => commandItem.includes(command));
    
    if (commandIndex === -1 || !containsCommand) {
        return {
            consoleMsg: "Message doesn't contain a command",
            response: false,
            message: message.content,
            messageAuthor: message.author.username + "#" + message.author.discriminator
        };
    }

    const command = commands.filter(command => commandItem.slice(1) === command).join('');
    
    const commandParam = messageArray.reduce((object, item) => {
        if (object.finish) {
            return object;
        }
        if (item.includes("[")) {
            return {
                ...object,
                string: item
            }
        }
        else if (item.includes("]")) {
            return {
                ...object,
                string: `${object.string} ${item}`,
                finish: true
            }
        }
        else {
            return {
                ...object,
                string: `${object.string} ${item}`
            }
        }
    }, {}).string;
    const commandParamTextOnly = commandParam.slice(1, commandParam.length - 1);
    return {
        command,
        param: {
            fullString: commandParam,
            textOnly: commandParamTextOnly,
            // hasDate: 
        },
        response: true
    }
}