const express = require('express');
const morgan = require('morgan');
const personRoutes = require('./routes/person')

const app = express();
const port = process.env.PORT || 8080;


app.use(express.json());

app.use('/api', personRoutes )

app.get('/', (req, res) => {
    res.send('Welcome to my API');
})

app.listen(port, () => console.log('server listening on port', port))