const lbRequest = require('./src/lbRequest');

(async () => {
    const response = await lbRequest( { filmId: `29Nu` } );
    const { name } = response.data;
    console.log(name);
})()