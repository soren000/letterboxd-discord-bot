const endpointRoutes = require('../../letterboxd/endpointRouter');

module.exports = () => {
    const commands = Object.keys(endpointRoutes).reduce((commands, endpoint) => {
        return [
            ...commands,
            ...endpointRoutes[endpoint].params
        ]
    }, []);

    return commands;
}