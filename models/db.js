const knex = require( 'knex' );
const knexConfig = require( '../knexfile' );

// Create database connection
const db = knex( knexConfig );

module.exports = db;