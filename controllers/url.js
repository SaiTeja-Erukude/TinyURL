const shortid = require( 'shortid' );
const knex = require( '../models/db' );

const generateShortURL = async ( req, res ) => {
    const body = req.body;

    if ( !body.redirectURL ) {
        return res.status( 400 ).json( { 'error': 'URL is required!' } );
    }


    let shortID = body.shortID;
    // if user enters a custom short ID
    if ( shortID ) {
        const shortIDExists = await helperShortIDExists( body.shortID );
        if ( shortIDExists ) {
            return res.status( 400 ).json( { 'error': 'Alias is already taken!' } );
        }
    } else {
        shortID = shortid();
    }

    // check if already exists in the db
    const existingShortID = await helperGetShortID( body.redirectURL );
    if ( existingShortID ) {
        return res.json( { shortID: existingShortID } );
    }


    await knex( 'tinyurl' ).insert( {
        shortID,
        redirectURL: body.redirectURL
    } );

    return res.json( { shortID } );
};


// helper method to return the shortID if already exists in the db
const helperGetShortID = async ( redirectURL ) => {
    const shortID = await knex.select( 'shortID' ).from( 'tinyurl' ).where( 'redirectURL', redirectURL );
    if ( shortID.length > 0 ) {
        return shortID[ 0 ].shortID;
    }
    return false;
};


// helper method to check if custome shortID is already taken
const helperShortIDExists = async ( shortID ) => {
    const redirectURL = await knex.select( 'redirectURL' ).from( 'tinyurl' ).where( 'shortID', shortID );
    if ( redirectURL.length > 0 ) {
        return true;
    }
    return false;
};


const getRedirectURL = async ( req, res ) => {
    const shortID = req.params.shortID;
    const redirectURL = await knex.select( 'redirectURL' ).from( 'tinyurl' ).where( 'shortID', shortID );
    if ( redirectURL.length > 0 ) {
        return res.redirect( redirectURL[ 0 ].redirectURL );
    }
    return res.status( 400 ).json( { 'error': 'Incorrect Short URL!' } );
};


module.exports = {
    generateShortURL,
    getRedirectURL
};