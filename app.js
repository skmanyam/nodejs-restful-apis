const express = require('express' );
const { seed } = require('./db');
const { operatorsRouter, businessesRouter, opsRouter } = require('./routes');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use( express.json() )
app.use( '/operators', operatorsRouter );
app.use( '/businesses', businessesRouter );
app.use( '/ops', opsRouter );

// Centralized error handler — Express recognizes this as an error middleware
// specifically because it declares 4 parameters (err first). Anything an
// asyncHandler-wrapped route calls next(err) with lands here, so every
// failure response is JSON instead of Express's default HTML error page.
app.use( ( err, req, res, next ) => {
    console.error( err );
    return res.status( 500 ).json( { error: 'Internal Server Error' } );
} );

app.listen( PORT, () => {

  console.log(`App listening at http://localhost:${PORT}`);
  seed();

} );
