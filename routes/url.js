const express = require( 'express' );
const { generateShortURL, getRedirectURL } = require( "../controllers/url" );
const router = express.Router();

router.post( '/', generateShortURL );
router.get( '/:shortID', getRedirectURL );

module.exports = router;