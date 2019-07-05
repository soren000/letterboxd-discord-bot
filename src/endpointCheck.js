const lbRequest = require('./lbRequest');
const genres = require('./data/genres');
const FastAverageColor = require('fast-average-color');
const { loadImage } = require('canvas');
var ColorThief = require('color-thief');
var colorThief = new ColorThief();

const endpointCheck = async ({ type, id, text, genre, decade, year }) => {
    try {
        switch (type) {
            case "FILM_INDIVIDUAL_ID":
                console.log('qwe')
                const response = await lbRequest({ request: `film/${id}` });
                const { name } = response.data;
                return `Pulled film by individual id: ${name}`;

            case "FILM_MULTI":
                console.log('qwe')
                const definedGenres = genres.filter(genreItem => genreItem.name.toLowerCase() === genre.toLowerCase());
                const { id: genreId = "" } = definedGenres.length > 0 && definedGenres[0];
                const yearParam = `&year=${year}`;
                const decadeParam = `&decade=${decade}`;
                const timeframeParam = year ? yearParam : decade ? decadeParam : "";
                const genreParam = genreId ? `&genre=${genreId}` : ``;
                const perPageParam = `perPage=${100}`;
                // need to services option later
                // need to add sorting option later
                const finalEndPoint = `films?${perPageParam}${genreParam}${timeframeParam}`;

                const filmsMultiResponse = await lbRequest({ request: finalEndPoint });
                // MUST REPLACE [0]
                const links = filmsMultiResponse.data.items[0].links;
                const filmImage = filmsMultiResponse.data.items[0].poster.sizes.reverse()[0].url;
                const directors = filmsMultiResponse.data.items[0];
                return 'Went throguh film multi query';

            case "FILM_INDIVIDUAL_AUTOCOMPLETE":
                const finalEndPointAuto = `search?input=${text}&searchMethod=Autocomplete&include=FilmSearchItem`;
                const filmsResponseAuto = await lbRequest({ request: finalEndPointAuto });
                console.log(filmsResponseAuto.data.items);

                return 'Went through film individual auto complete'

            default:
                return "Passed through endpoint check with no results. No type found."
        }
    }
    catch (e) {
        // console.log(e);
    }
}

module.exports = endpointCheck;