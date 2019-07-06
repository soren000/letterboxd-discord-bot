const lbRequest = require('./src/letterboxd/lbRequest');
const requestRouter = require('./src/letterboxd/requestRouter');

const commandExtract = require('./src/discord/commandExtract');
const endpointRouter = require('./src/letterboxd/endpointRouter');
const embedGen = require('./src/discord/embedGen');
const { client } = require('./src/discord/initialize');

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
        const extractedCommand = await commandExtract(message);
        if (!extractedCommand.response) { return };
        const endpoint = Object.keys(endpointRouter)
            .filter(endpoint => endpointRouter[endpoint].params.indexOf(extractedCommand.command) > -1)[0];
        const lboxdRes = await requestRouter( { type: endpoint }, { ...extractedCommand.param } );
        
        const embed = await embedGen({details: {...lboxdRes}, type: endpoint });
        
        message.channel.send(embed);
    }
    catch (e) {
        console.log(e);
    }
    
});

const testCommand = () => {
    let command = 'asd asd off-campus -f [shining]';
    let testChannelID = '596645734737248256';

    let channel = client.channels.get(testChannelID);
    return channel.send(command);
}

client.on('ready', () => {
    console.log('Ready!');
    testCommand();
    // client.user.setActivity('');
});

client.on('error', console.error);