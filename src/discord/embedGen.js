const bold = require('./styling/bold');

module.exports = async ({ type, details }) => {
    // const { name: title, releaseYear, originalName, directorsString, lboxdLink: url } = details;


    // const originalNameEmbed = originalName ? `${bold("Original Name")}: ${originalName}\n` : "";
    // // const releaseYearEmbed = `${bold("Release Year")}: ${releaseYear}\n`;
    // const directorEmbed = `${bold("Director(s)")}: ${directorsString}\n`;

    // const embedMeat = originalNameEmbed + directorEmbed;
    let embed;

    if (type === "TEST") {
        embed = {
            title: "Some title for testing",
            fields: [
                {
                    name: "Field 1 title",
                    value: "Field 2 body"
                }
            ]
        }
    }
    else if (type === "TEST2") {
        embed = {
            title: "Second version, after edit",
            fields: [
                {
                    name: "Title Edited",
                    value: "Body edited"
                }
            ]
        };
    }
    else if (type === "FILM_INDIVIDUAL_AUTOCOMPLETE") {
        embed = {
            fields: [
                {
                    name: `${title} (${releaseYear})`,
                    value: embedMeat
                }
            ]
        };
    }
    else {
        return;
    }

    return {
        embed: {
            ...embed
        }
    };
}