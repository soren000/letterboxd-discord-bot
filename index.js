const lbRequest = require('./src/letterboxd/lbRequest');
const requestRouter = require('./src/letterboxd/requestRouter');

const { client } = require('./src/discord/config/initialize');
const commandExtract = require('./src/discord/commandExtract');
const endpointRouter = require('./src/letterboxd/endpointRouter');
const embedGen = require('./src/discord/embedGen');
const testCommand = require('./src/discord/commands/testCommand');
const reactionGen = require('./src/discord/reactions/reactionGen');
const { messageStateStore } = require('./src/discord/data/messageStateStore');

(async () => {
    try {
        // const test = await endpointCheck( { type: "FILM_INDIVIDUAL_ID", id: "29Nu" } );
        // const test = await endpointCheck( { type: "FILM_MULTI", genre: "horror", year: 1980 } );
        // const test = await endpointCheck( { type: "FILM_INDIVIDUAL_AUTOCOMPLETE", text: "shining" } );
        // console.log(test);
    }
    catch (e) {
        console.log(e); 
    }
})();

client.on('message', async message => {
    try {
        // if (message.author.bot) {
        //     return;
        // }
        const extractedCommand = await commandExtract(message); // Find command and parameters
        if (!extractedCommand.response) { return };
        const endpoint = Object.keys(endpointRouter)
            .filter(endpoint => endpointRouter[endpoint].params.indexOf(extractedCommand.command) > -1)[0]; // Find the endpoint based on the command - Important for alias commands
        const lboxdRes = await requestRouter({ type: endpoint }, { ...extractedCommand.param }); // Send the request and return data back
        
        // Store data into an object in another file
        // Generate the first embed here and send message
        // Make a separate file for embed edits

        const embed = await embedGen({ details: { ...lboxdRes }, type: endpoint });
        
        message.channel.send(embed)
            .then((botMessage) => {
                messageStateStore(botMessage, lboxdRes);
                reactionGen(botMessage)

            });
    }
    catch (e) {
        console.log(e);
    }

});

client.on('ready', () => {
    console.log('Ready!');
    testCommand();
    // client.user.setActivity('');
});

client.on('error', console.error);