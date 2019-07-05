const lbRequest = require('./src/lbRequest');
const endpointCheck = require('./src/endpointCheck');
const { client } = require('./src/discord/initialize');
console.log(client);

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
    console.log('test')
})

client.on('error', console.error);