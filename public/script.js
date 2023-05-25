const hostURL = window.location.href;
const shortendBtn = document.getElementById( 'shortenBtn' );

shortendBtn.addEventListener( 'click', async () => {
    const redirectURL = document.getElementById( 'redirectURL' ).value;
    const shortID = document.getElementById( 'shortID' ).value;
    const tinyURL = document.getElementById( 'tinyURL' );

    if ( !redirectURL ) {
        tinyURL.value = "Long URL is required!";
        tinyURL.classList.remove( 'success' );
        tinyURL.classList.add( 'error' );
        return;
    }

    const data = {
        redirectURL,
        shortID
    };

    const response = await fetch( hostURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( data )
    } );

    const resData = await response.json();

    if ( !response.ok ) {
        tinyURL.value = resData.error;;
        tinyURL.classList.remove( 'success' );
        tinyURL.classList.add( 'error' );
        return;
    } else {
        tinyURL.value = hostURL + resData.shortID;
        tinyURL.classList.remove( 'error' );
        tinyURL.classList.add( 'success' );
    }
} );