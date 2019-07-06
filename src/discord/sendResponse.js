const embedGen = require('./embedGen');

const commandCheck = async (message, param) => {
    // console.log(param);
    message.channel.send(embedGen({title: "poop" }));
    return;
}

module.exports = commandCheck;