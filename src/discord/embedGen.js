const bold = require('./styling/bold');

module.exports = async ({ type, details }) => {
    const { name: title, releaseYear, originalName, directorsString, lboxdLink: url } = details;


    const originalNameEmbed = originalName ? `${bold("Original Name")}: ${originalName}\n` : "";
    // const releaseYearEmbed = `${bold("Release Year")}: ${releaseYear}\n`;
    const directorEmbed = `${bold("Director(s)")}: ${directorsString}\n`;

    const embedMeat = originalNameEmbed + directorEmbed;

    switch (type) {
        case "FILM_INDIVIDUAL_AUTOCOMPLETE":

            const embed = {
                fields: [
                    {
                        name: `${title} (${releaseYear})`,
                        value: embedMeat
                    }
                ]
            };
            return {
                embed: {
                    ...embed
                }
            };
        default:
            return;
    }
    const exampleEmbed = {
        title
    }
    // const exampleEmbed = {
    //     color: 0x0099ff,
    //     title: 'Some title',
    //     url: 'https://discord.js.org',
    //     author: {
    //         name: 'Some name',
    //         icon_url: 'https://i.imgur.com/wSTFkRM.png',
    //         url: 'https://discord.js.org',
    //     },
    //     description: 'Some description here',
    //     thumbnail: {
    //         url: 'https://i.imgur.com/wSTFkRM.png',
    //     },
    //     fields: [
    //         {
    //             name: 'Regular field title',
    //             value: 'Some value here',
    //         },
    //         {
    //             name: '\u200b',
    //             value: '\u200b',
    //         },
    //         {
    //             name: 'Inline field title',
    //             value: 'Some value here',
    //             inline: true,
    //         },
    //         {
    //             name: 'Inline field title',
    //             value: 'Some value here',
    //             inline: true,
    //         },
    //         {
    //             name: 'Inline field title',
    //             value: 'Some value here',
    //             inline: true,
    //         },
    //     ],
    //     image: {
    //         url: 'https://i.imgur.com/wSTFkRM.png',
    //     },
    //     timestamp: new Date(),
    //     footer: {
    //         text: 'Some footer text here',
    //         icon_url: 'https://i.imgur.com/wSTFkRM.png',
    //     },
    // };

    return {
        embed: {
            ...exampleEmbed
        }
    };
}