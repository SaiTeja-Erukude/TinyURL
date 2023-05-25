const express = require( 'express' );
const app = express();

require( 'dotenv' ).config();

const PORT = process.env.PORT || 3000;
const urlRouter = require( './routes/url' );

app.use( express.json() );
app.use( express.static( 'public' ) );
app.use( '/', urlRouter );


app.listen( PORT, () => {
    console.log( `Listening at PORT ${ PORT }` );
} );