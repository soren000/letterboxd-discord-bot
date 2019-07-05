const axios = require('axios');
const sha256 = require('js-sha256');
const uuidv1 = require('uuid/v1');
const moment = require('moment');
const { secret, apiKey } = require('../private/letterboxd');

const lbRequest = async ( { filmId, type, request } ) => {
    const uniqueId = uuidv1();
    const timeStamp = moment().unix();

    const base = `https://api.letterboxd.com/api/v0/`;
    const endpoint = `${request}`;
    const api = `apikey=${apiKey}`;
    const nonce = `nonce=${uniqueId}`;
    const timestamp = `timestamp=${timeStamp}`;
    const questionMarkCheck = endpoint.indexOf('?') === -1 ? '?' : '&';
    const requiredParams = `${api}&${nonce}&${timestamp}`;
    const url = `${base}${endpoint}${questionMarkCheck}${requiredParams}`;

    const method = 'GET';
    const body = '';
    const fullURL = `${method}\u0000${url}\u0000${body}`;
    const signature = sha256.hmac(secret, fullURL);

    const signatureParam = `signature=${signature}`;

    const finalURL = `${url}&${signatureParam}`;

    return await axios.get(finalURL);
}

module.exports = lbRequest;