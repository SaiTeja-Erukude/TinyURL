/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function ( knex ) {
    return knex.schema
        .createTable( 'tinyurl', ( table ) => {
            table.increments( 'ID' ).primary();
            table.string( 'shortID' ).notNullable().unique();
            table.string( 'redirectURL' ).notNullable().unique();
        } );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function ( knex ) {
    return knex.schema
        .dropTable( "tinyurl" );
};
